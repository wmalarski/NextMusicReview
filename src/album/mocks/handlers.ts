import { graphql } from "msw";
import {
  AlbumDetailsQuery,
  AlbumDetailsQueryVariables,
  AlbumReviewsQuery,
  AlbumReviewsQueryVariables,
  DeleteAlbumMutation,
  DeleteAlbumMutationVariables,
  UpdateAlbumMutation,
  UpdateAlbumMutationVariables
} from "../../graphql/types";
import {
  albumDetailsQueryDefault,
  albumGridItemDefault,
  reviewListItemDefault
} from "../../tests/defaults";

export default [
  graphql.query<AlbumReviewsQuery, AlbumReviewsQueryVariables>(
    "AlbumReviews",
    (_req, res, ctx) =>
      res(
        ctx.data({
          album: {
            ...albumGridItemDefault,
            reviews: {
              nodes: [
                { ...reviewListItemDefault, id: "rId1" },
                { ...reviewListItemDefault, id: "rId2" }
              ]
            }
          }
        })
      )
  ),
  graphql.query<AlbumDetailsQuery, AlbumDetailsQueryVariables>(
    "AlbumDetails",
    (_req, res, ctx) => res(ctx.data(albumDetailsQueryDefault))
  ),
  graphql.mutation<DeleteAlbumMutation, DeleteAlbumMutationVariables>(
    "DeleteAlbum",
    (_req, res, ctx) => {
      if (!sessionStorage.getItem("authorization")) {
        return res(ctx.errors([{ message: "Unauthorized" }]));
      }
      return res(ctx.data({ deleteAlbum: { success: true } }));
    }
  ),
  graphql.mutation<UpdateAlbumMutation, UpdateAlbumMutationVariables>(
    "UpdateAlbum",
    (req, res, ctx) => {
      const { input } = req.variables;

      if (!sessionStorage.getItem("authorization")) {
        return res(ctx.errors([{ message: "Unauthorized" }]));
      }

      return res(
        ctx.data({
          updateAlbum: {
            album: {
              id: input.id,
              name: input.name,
              mBid: input.mBid,
              performer: {
                id: input.id,
                name: "pName"
              },
              year: input.year
              // details: {
              //   image: [
              //     {
              //       size: "large",
              //       url: "url"
              //     }
              //   ]
              // }
            }
          }
        })
      );
    }
  )
];
