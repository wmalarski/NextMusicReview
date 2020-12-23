import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { fetcher } from "../../graphql/fetcher";
import {
  ReviewsDocument,
  ReviewsQuery,
  ReviewsQueryVariables
} from "../../graphql/types";

export const fetchReviews = (arg: any) => {
  console.log("fetchReviews", arg);
  return fetcher<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, {
    after: "",
    first: 10,
    order: null
  })();
};

export const ReviewsInfiniteQueryKey = "reviews";

export default function useReviewsInfiniteQuery(): UseInfiniteQueryResult<
  ReviewsQuery,
  Error
> {
  return useInfiniteQuery(ReviewsInfiniteQueryKey, fetchReviews, {
    getNextPageParam: (lastPage, pages) => {
      console.log("getNextPageParam", lastPage, pages);
      const { endCursor, hasNextPage } = lastPage.reviews?.pageInfo ?? {};
      if (!hasNextPage) return null;
      return { after: endCursor, first: 10, order: null };
    }
  });
}
