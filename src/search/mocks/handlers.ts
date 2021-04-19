import { graphql } from "msw";
import {
  AlbumSearchQuery,
  AlbumSearchQueryVariables
} from "../../graphql/types";
import { albumGridItemDefault } from "../../tests/defaults";

export default [
  graphql.query<AlbumSearchQuery, AlbumSearchQueryVariables>(
    "AlbumSearch",
    (req, res, ctx) =>
      res(
        ctx.data({
          search: {
            pageInfo: req.variables.after
              ? { hasNextPage: false }
              : { hasNextPage: true, endCursor: "first" },
            nodes: [
              {
                ...albumGridItemDefault,
                id: req.variables.after ? "first" : "second",
                name:
                  req.variables.query === "" ? "Random" : req.variables.query
              }
            ]
          }
        })
      )
  )
];
