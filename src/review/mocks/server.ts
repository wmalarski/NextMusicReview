import { graphql } from "msw";
import { setupServer } from "msw/node";
import {
  CreateReviewMutation,
  CreateReviewMutationVariables
} from "../../graphql/types";

export default setupServer(
  graphql.mutation<CreateReviewMutation, CreateReviewMutationVariables>(
    "CreateReview",
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
          createReview: {
            review: {
              id: "qwertyuio",
              createdAt: "02-04",
              rating: input.rating,
              text: input.text,
              updatedAt: "03-04"
            }
          }
        })
      );
    }
  )
);
