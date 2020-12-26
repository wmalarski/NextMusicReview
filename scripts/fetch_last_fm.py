import os
from typing import Dict, List

import requests
from dotenv import load_dotenv, find_dotenv
from tqdm import tqdm

load_dotenv(find_dotenv(".env.local"))

url = 'http://ws.audioscrobbler.com/2.0'
api_key = os.getenv("LAST_FM_API_KEY")
common_params = {
    "api_key": api_key,
    "format": "json"
}


def fetch_similar_performers(db_performers: List) -> List:
    unique_performers_id = {
        db_performer["mBid"]
        for db_performer in db_performers
    }

    similar_performers = []
    for db_performer in tqdm(db_performers, desc="Fetching similar performers:"):
        params = {
            "limit": 20,
            "method": "artist.getsimilar",
            "mbid": db_performer["mBid"],
            **common_params
        }
        try:
            json_response = requests.get(url, params).json()
        except Exception as e:
            print(f"Error: {e}. Params: {params}")
            continue

        response_performers = [
            {"name": similar_performer["name"], "mBid": similar_performer["mbid"]}
            for similar_performer in json_response['similarartists']['artist']
            if (float(similar_performer["match"]) >= 0.75
                and "mbid" in similar_performer
                and similar_performer["mbid"] not in unique_performers_id)
        ]

        new_ids = {new_performer["mBid"] for new_performer in response_performers}
        similar_performers += response_performers
        unique_performers_id.update(new_ids)

    return similar_performers


def fetch_more_performers(db_performers: List) -> List:
    unique_albums_ids = {
        db_album["mBid"]
        for db_performer in db_performers
        for db_album in db_performer["albums"]
    }

    similar_performers = fetch_similar_performers(db_performers)

    result_performers = []
    for similar_performer in tqdm(similar_performers, "Fetching top albums: "):
        params = {
            "limit": 5,
            "method": "artist.gettopalbums",
            "mbid": similar_performer["mBid"],
            **common_params
        }
        try:
            json_response = requests.get(url, params).json()
        except Exception as e:
            print(f"Error: {e}. Params: {params}")
            continue

        performer_albums = [
            {"name": album["name"], "mBid": album["mbid"], "year": 0, "reviews": []}
            for album in json_response['topalbums']['album']
            if "mbid" in album and album["mbid"] not in unique_albums_ids
        ]

        if len(performer_albums) > 0:
            result_performers.append({
                "mBid": similar_performer["mBid"],
                "name": similar_performer["name"],
                "albums": performer_albums,
            })

    return result_performers


def fetch_more_albums(db_performer: Dict) -> List:
    unique_albums_ids = {
        db_album["mBid"]
        for db_album in db_performer["albums"]
    }

    params = {
        "limit": 5,
        "method": "artist.gettopalbums",
        "mbid": db_performer["mBid"],
        **common_params,
    }

    try:
        json_response = requests.get(url, params).json()
    except Exception as e:
        print(f"Error: {e}. Params: {params}")
        return []

    return [
        {"name": album["name"], "mBid": album["mbid"], "year": 0, "reviews": []}
        for album in json_response['topalbums']['album']
        if "mbid" in album and album["mbid"] not in unique_albums_ids
    ]
