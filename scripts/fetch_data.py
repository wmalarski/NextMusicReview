import pickle
from pathlib import Path

from scripts.fetch_last_fm import fetch_more_performers
from scripts.fetch_db import fetch_db_performers


def main():
    db_performers = fetch_db_performers()
    print("FINISHED")
    with Path("db_performers.pkl").open("wb") as file:
        pickle.dump(db_performers, file)

    last_fm_performers = fetch_more_performers(db_performers)
    print("FINISHED")
    with Path("last_fm_performers.pkl").open("wb") as file:
        pickle.dump(last_fm_performers, file)


if __name__ == '__main__':
    main()
