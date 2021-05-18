import {
  AlbumDetailsQuery,
  AlbumGridItemFragment,
  PerformerDetailsQuery,
  ReviewListItemFragment
} from "../graphql/types";

export const albumGridItemDefault: AlbumGridItemFragment = {
  id: "aId",
  name: "albumName",
  mBid: "mBid",
  year: 1999,
  // details: {
  //   image: [
  //     { size: "large", url: "aaa" },
  //     { size: "mega", url: "bbb" }
  //   ]
  // },
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
    __typename: "Album"
    // details: {
    //   wiki: {
    //     content: "content",
    //     summary: "summary",
    //     published: "published"
    //   }
    // }
  }
};

export const performerDetailsQueryDefault: PerformerDetailsQuery = {
  performer: {
    id: "pId",
    name: "performerName",
    albums: {
      nodes: [
        {
          ...albumGridItemDefault,
          id: "aId1",
          reviews: { nodes: [{ ...reviewListItemDefault, id: "rId1" }] }
        },
        {
          ...albumGridItemDefault,
          id: "aId2",
          reviews: { nodes: [{ ...reviewListItemDefault, id: "rId2" }] }
        }
      ]
    }
    // details: {
    //   bio: {
    //     content: "content",
    //     summary: "summary",
    //     published: "published"
    //   }
    // }
  }
};
