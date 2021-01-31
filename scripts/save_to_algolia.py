import os
import pickle
from pathlib import Path

from algoliasearch.search_client import SearchClient
from dotenv import load_dotenv, find_dotenv
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

load_dotenv(find_dotenv(".env.local"))


def fetch_albums():
    document = gql("""
        query Albums($first: Int, $after: String){
          albums(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              name
              performer {
                id
                name
              }
              year
              details {
                image {
                  size
                  url
                }
              }
            }
          }
        }
    """)
    transport = RequestsHTTPTransport(os.getenv("API_ENDPOINT"))
    client = Client(transport=transport, fetch_schema_from_transport=True)

    has_next_page = True
    end_cursor = None
    nodes = []
    while has_next_page:
        try:
            data = client.execute(
                document=document,
                variable_values={"after": end_cursor, "first": 50}
            )
        except Exception as e:
            print("Exception", e, {"after": end_cursor, "first": 50})
            continue

        page_info = data["albums"]["pageInfo"]
        has_next_page = page_info["hasNextPage"]
        end_cursor = page_info["endCursor"]
        nodes += data["albums"]["nodes"]
        print(f"Collected: {len(nodes)}, Has next page: {has_next_page}")

    return nodes


def save_az_albums():
    nodes = fetch_albums()
    print("FINISHED")
    with Path("az_albums.pkl").open("wb") as file:
        pickle.dump(nodes, file)


def upload_to_algolia():
    with Path("az_albums.pkl").open("rb") as file:
        albums = pickle.load(file)

    objects = [
        {
            **album,
            "performer": album["performer"]["name"],
            "performerId": album["performer"]["id"],
            "imageUrl": next((
                image["url"] for image in (album.get("details") or {}).get("image", [])
                if image is not None and image["size"] == "large"
            ), None),
        } for album in albums
    ]

    client = SearchClient.create(
        app_id=os.getenv("ALGOLIA_APP_ID"),
        api_key=os.getenv("ALGOLIA_APP_KEY")
    )
    index_ = client.init_index(os.getenv("ALGOLIA_INDEX_NAME"))

    index_.replace_all_objects(
        objects=objects,
        request_options={'autoGenerateObjectIDIfNotExist': True}
    )
    client.close()


if __name__ == '__main__':
    # save_az_albums()
    upload_to_algolia()
