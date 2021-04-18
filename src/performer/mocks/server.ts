import { graphql } from "msw";
import { setupServer } from "msw/node";
import {
  PerformerDetailsQuery,
  PerformerDetailsQueryVariables,
  UpdatePerformerMutation,
  UpdatePerformerMutationVariables
} from "../../graphql/types";
import {
  albumGridItemDefault,
  reviewListItemDefault
} from "../../mocks/defaults";

export default setupServer(
  graphql.mutation<UpdatePerformerMutation, UpdatePerformerMutationVariables>(
    "UpdatePerformer",
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
          updatePerformer: {
            performer: {
              id: input.id,
              name: input.name
            }
          }
        })
      );
    }
  ),
  graphql.query<PerformerDetailsQuery, PerformerDetailsQueryVariables>(
    "PerformerDetails",
    (req, res, ctx) =>
      res(
        ctx.data({
          performer: {
            id: req.variables.id,
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
            },
            details: {
              bio: {
                content: "content",
                summary: "summary",
                published: "published"
              }
            }
          }
        })
      )
  )
);
