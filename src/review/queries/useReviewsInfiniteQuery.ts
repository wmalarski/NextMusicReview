import {
  QueryFunction,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryResult
} from "react-query";
import { fetcher } from "../../graphql/fetcher";
import {
  ReviewsDocument,
  ReviewsQuery,
  ReviewsQueryVariables
} from "../../graphql/types";

export const fetchReviews: QueryFunction<ReviewsQuery> = (
  context: QueryFunctionContext
) =>
  fetcher<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, {
    after: context.pageParam,
    first: 10,
    order: null
  })();

export const ReviewsInfiniteQueryKey = "reviews";

export default function useReviewsInfiniteQuery(): UseInfiniteQueryResult<
  ReviewsQuery,
  Error
> {
  return useInfiniteQuery<ReviewsQuery, Error, ReviewsQuery>(
    ReviewsInfiniteQueryKey,
    fetchReviews,
    {
      getNextPageParam: lastPage => {
        const { endCursor, hasNextPage } = lastPage.reviews?.pageInfo ?? {};
        if (!hasNextPage) return null;
        return endCursor;
      }
    }
  );
}
