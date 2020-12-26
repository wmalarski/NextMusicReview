export interface AlbumSearchHit {
  id: string;
  name: string;
  performer: string;
  year: number;
  performerId: string;
  objectID: string;
}

/*
{
  "hit": {
    "id": "QWxidW0KZDVmZTc1MjRlMmE0MjEyNjVhYjk1MTA3MA==",
    "name": "MTV Unplugged",
    "performer": "Alejandro Sanz",
    "year": 0,
    "performerId": "UGVyZm9ybWVyCmQ1ZmU3NTI0ZTJhNDIxMjY1YWI5NTEwNmM=",
    "objectID": "2498091000",
    "_highlightResult": {
      "id": {
        "value": "QWxidW0KZDVmZTc1MjRlMmE0MjEyNjVhYjk1MTA3MA==",
        "matchLevel": "none",
        "matchedWords": []
      },
      "name": {
        "value": "MTV Unplugged",
        "matchLevel": "none",
        "matchedWords": []
      },
      "performer": {
        "value": "Alejandro Sanz",
        "matchLevel": "none",
        "matchedWords": []
      },
      "year": {
        "value": "0",
        "matchLevel": "none",
        "matchedWords": []
      },
      "performerId": {
        "value": "UGVyZm9ybWVyCmQ1ZmU3NTI0ZTJhNDIxMjY1YWI5NTEwNmM=",
        "matchLevel": "none",
        "matchedWords": []
      }
    },
    "__position": 1
  }
}
*/
