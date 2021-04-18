import { graphql } from "msw";
import { setupServer } from "msw/node";
import {
  CreateReviewMutation,
  CreateReviewMutationVariables,
  ReviewsQuery,
  ReviewsQueryVariables
} from "../../graphql/types";
import {
  albumGridItemDefault,
  reviewListItemDefault
} from "../../mocks/defaults";

export default setupServer(
  graphql.query<ReviewsQuery, ReviewsQueryVariables>(
    "Reviews",
    (req, res, ctx) =>
      res(
        ctx.data({
          reviews: {
            pageInfo: req.variables.after
              ? { hasNextPage: false }
              : { hasNextPage: true, endCursor: "first" },
            nodes: [
              {
                ...reviewListItemDefault,
                album: albumGridItemDefault,
                id: req.variables.after ? "first" : "second"
              }
            ]
          }
        })
      )
  ),
  graphql.mutation<CreateReviewMutation, CreateReviewMutationVariables>(
    "CreateReview",
    (req, res, ctx) => {
      const { input } = req.variables;

      if (!sessionStorage.getItem("authorization")) {
        return res(ctx.errors([{ message: "Unauthorized" }]));
      }

      return res(
        ctx.data({
          createReview: {
            review: {
              ...reviewListItemDefault,
              rating: input.rating,
              text: input.text
            }
          }
        })
      );
    }
  )
);
