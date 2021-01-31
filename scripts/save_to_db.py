import json
import os
import pickle
from pathlib import Path
from typing import List

from dotenv import load_dotenv, find_dotenv
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
from tqdm import tqdm
import http.client

load_dotenv(find_dotenv(".env.local"))


def fetch_jwt_token() -> str:
    conn = http.client.HTTPSConnection(os.getenv("AUTH0_DOMAIN"))

    payload = {
        "client_id": os.getenv("AUTH0_CLIENT_ID"),
        "client_secret": os.getenv("AUTH0_CLIENT_SECRET"),
        "audience": os.getenv("AUTH0_AUDIENCE"),
        "grant_type": "client_credentials"
    }
    json_payload = json.dumps(payload)

    headers = {'content-type': "application/json"}

    conn.request("POST", "/oauth/token", json_payload, headers)

    res = conn.getresponse()
    data = res.read()

    token_dict = json.loads(data.decode("utf-8"))
    return f"{token_dict['token_type']} {token_dict['access_token']}"


def save_to_db(performers: List, auth_token: str):
    transport = RequestsHTTPTransport(
        url="http://localhost:5000/graphql/",
        headers={'Authorization': auth_token}
    )

    create_document = gql("""
        mutation CreatePerfomer($input: CreatePerformerInput!){
          createPerformer(input: $input) {
            errors {
              code
              message
            }
            performer {
              id
            }
          }
        }
    """)

    # {
    #   "input": {
    #     "mBid": "",
    #     "name": "",
    #     "albums": [
    #       {
    #         "mBid": "",
    #         "name": "",
    #         "year": 1800,
    #         "reviews": [
    #           {
    #             "text": "t",
    #             "rating": 3.3,
    #             "createdAt": "",
    #             "updatedAt": ""
    #           }
    #         ]
    #       }
    #     ]
    #   }
    # }

    client = Client(transport=transport, fetch_schema_from_transport=True)

    for performer in tqdm(performers, desc="Saving to database"):
        client.execute(
            document=create_document,
            variable_values={"input": performer}
        )


def main():
    jwt_token = fetch_jwt_token()

    with Path("db_performers.pkl").open("rb") as file:
        performers = pickle.load(file)

    with Path("last_fm_performers.pkl").open("rb") as file:
        performers += pickle.load(file)

    save_to_db(performers, jwt_token)


if __name__ == '__main__':
    main()
