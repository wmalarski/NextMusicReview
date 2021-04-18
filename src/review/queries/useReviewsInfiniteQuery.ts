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
import { ReviewFilterState } from "../types";

export type FetchReviewsKey = ["reviews", ReviewFilterState];

const fetchReviews: QueryFunction<ReviewsQuery, FetchReviewsKey> = ({
  pageParam,
  queryKey
}: QueryFunctionContext<FetchReviewsKey, string>) =>
  fetcher<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, {
    after: pageParam ?? null,
    first: 10,
    order: [queryKey[1].sort]
  })();

export default function useReviewsInfiniteQuery(
  filter: ReviewFilterState
): UseInfiniteQueryResult<ReviewsQuery, Error> {
  return useInfiniteQuery<ReviewsQuery, Error, ReviewsQuery, FetchReviewsKey>(
    ["reviews", filter],
    fetchReviews,
    {
      getNextPageParam: lastPage => lastPage.reviews?.pageInfo.endCursor
    }
  );
}
