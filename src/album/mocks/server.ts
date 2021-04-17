import { graphql } from "msw";
import { setupServer } from "msw/node";
import {
  AlbumDetailsQuery,
  AlbumDetailsQueryVariables,
  UpdateAlbumMutation,
  UpdateAlbumMutationVariables
} from "../../graphql/types";

export default setupServer(
  graphql.query<AlbumDetailsQuery, AlbumDetailsQueryVariables>(
    "AlbumDetails",
    (_req, res, ctx) =>
      res(
        ctx.data({
          album: {
            details: {
              wiki: {
                content: "content",
                summary: "summary",
                published: "published"
              }
            }
          }
        })
      )
  ),
  graphql.mutation<UpdateAlbumMutation, UpdateAlbumMutationVariables>(
    "UpdateAlbum",
    (req, res, ctx) => {
      const { input } = req.variables;

      if (!sessionStorage.getItem("authorization")) {
        return res(
          ctx.errors([
            {
              message: "Unauthorized"
            }
          ])
        );
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
              year: input.year,
              details: {
                image: [
                  {
                    size: "large",
                    url: "url"
                  }
                ]
              }
            }
          }
        })
      );
    }
  )
);
