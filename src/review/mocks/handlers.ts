import { graphql } from "msw";
import {
  albumGridItemDefault,
  reviewListItemDefault
} from "../../graphql/mocks/defaults";
import {
  CreateReviewMutation,
  CreateReviewMutationVariables,
  ReviewsQuery,
  ReviewsQueryVariables
} from "../../graphql/types";

export default [
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
];
