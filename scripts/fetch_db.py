from typing import Dict, List

from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
from tqdm import tqdm

from scripts.fetch_last_fm import fetch_more_albums


def get_reviews(input_reviews: Dict) -> List:
    reviews = []
    for review_edge in input_reviews["edges"]:
        review_node = review_edge["node"]
        reviews.append({
            "text": review_node["review"],
            "rating": review_node["rating"],
            "createdAt": review_node["created"],
            "updatedAt": review_node["lastUpdated"],
        })
    return reviews


def get_albums(input_albums: Dict) -> List:
    albums = []
    for album_edge in input_albums["edges"]:
        album_node = album_edge["node"]
        reviews = get_reviews(album_node.get("reviewSet", {"edges": []}))
        albums.append({
            "mBid": album_node["mbid"],
            "name": album_node["name"],
            "year": album_node["year"],
            "reviews": reviews
        })
    return albums


def get_performers(input_performers: Dict) -> List:
    performers = []
    for performer_edge in tqdm(input_performers["edges"], desc="Fetching more albums:"):
        performer_node = performer_edge["node"]
        albums = get_albums(performer_node["albumSet"])

        performer = {
            "mBid": performer_node["mbid"],
            "name": performer_node["name"],
            "albums": albums,
        }

        new_albums = fetch_more_albums(performer)
        performers.append({**performer, "albums": albums + new_albums})

    return performers


def fetch_db_performers() -> List:
    transport = RequestsHTTPTransport("https://review-music.herokuapp.com/")

    read_document = gql("""
        query read($after: String){
          performerSet(after: $after, first: 50) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                name
                mbid
                albumSet {
                  edges {
                    node {
                      mbid
                      name
                      year
                      reviewSet {
                        edges {
                          node {
                              review
                              rating
                              created
                              lastUpdated
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    """)

    client = Client(transport=transport, fetch_schema_from_transport=True)

    has_next_page = True
    end_cursor = ""
    edges = []
    while has_next_page:
        data = client.execute(
            document=read_document,
            variable_values={"after": end_cursor}
        )
        page_info = data["performerSet"]["pageInfo"]
        has_next_page = page_info["hasNextPage"]
        end_cursor = page_info["endCursor"]
        edges += data["performerSet"]["edges"]
        print(f"Collected: {len(edges)}, Has next page: {has_next_page}")

    return get_performers({"edges": edges})
