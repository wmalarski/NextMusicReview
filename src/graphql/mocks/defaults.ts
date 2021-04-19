import {
  AlbumDetailsQuery,
  AlbumGridItemFragment,
  ReviewListItemFragment
} from "../types";

export const albumGridItemDefault: AlbumGridItemFragment = {
  id: "aId",
  name: "albumName",
  mBid: "mBid",
  year: 1999,
  details: {
    image: [
      { size: "large", url: "aaa" },
      { size: "mega", url: "bbb" }
    ]
  },
  performer: {
    id: "pId",
    name: "performerName"
  }
};

export const reviewListItemDefault: ReviewListItemFragment = {
  createdAt: "04-04",
  id: "eId",
  rating: 5.5,
  text: "reviewText",
  updatedAt: "04-04"
};

export const albumDetailsQueryDefault: AlbumDetailsQuery = {
  album: {
    details: {
      wiki: {
        content: "content",
        summary: "summary",
        published: "published"
      }
    }
  }
};
