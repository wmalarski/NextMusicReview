import { graphql } from "msw";
import { setupServer } from "msw/node";
import {
  AlbumSearchQuery,
  AlbumSearchQueryVariables
} from "../../graphql/types";

export default setupServer(
  graphql.query<AlbumSearchQuery, AlbumSearchQueryVariables>(
    "AlbumSearch",
    (req, res, ctx) =>
      res(
        ctx.data({
          search: {
            pageInfo: {
              hasNextPage: false,
              endCursor: "bb"
            },
            nodes: [
              {
                id: String(Math.random() * 100000),
                mBid: "mbid",
                name:
                  req.variables.query === "" ? "Random" : req.variables.query,
                year: 1999,
                details: {
                  image: [
                    {
                      size: "large",
                      url: "aa"
                    }
                  ]
                },
                performer: {
                  id: "pId",
                  name: "performer"
                }
              }
            ]
          }
        })
      )
  )
);
