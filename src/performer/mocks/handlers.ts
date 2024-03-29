import { graphql } from "msw";
import {
  DeletePerformerMutation,
  DeletePerformerMutationVariables,
  PerformerDetailsQuery,
  PerformerDetailsQueryVariables,
  UpdatePerformerMutation,
  UpdatePerformerMutationVariables
} from "../../graphql/types";
import { performerDetailsQueryDefault } from "../../tests/defaults";

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
            ...performerDetailsQueryDefault.performer,
            id: req.variables.id
          }
        })
      )
  )
];
