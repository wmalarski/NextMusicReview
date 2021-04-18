import { graphql } from "msw";
import {
  albumGridItemDefault,
  reviewListItemDefault
} from "../../graphql/mocks/defaults";
import {
  DeletePerformerMutation,
  DeletePerformerMutationVariables,
  PerformerDetailsQuery,
  PerformerDetailsQueryVariables,
  UpdatePerformerMutation,
  UpdatePerformerMutationVariables
} from "../../graphql/types";

export default [
  graphql.mutation<DeletePerformerMutation, DeletePerformerMutationVariables>(
    "DeletePerformer",
    (_req, res, ctx) => {
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
          deletePerformer: {
            success: true
          }
        })
      );
    }
  ),
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
];
