import { graphql } from "msw";
import { setupServer } from "msw/node";
import {
  UpdatePerformerMutation,
  UpdatePerformerMutationVariables
} from "../../graphql/types";

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
  )
);
