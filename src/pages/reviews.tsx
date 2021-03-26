import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import Layout from "../common/components/layout";
import { compact } from "../common/functions";
import ReviewFilter from "../review/components/reviewFilter";
import ReviewList from "../review/components/reviewList";
import { defaultReviewFilterState } from "../review/defaults";
import useReviewsInfiniteQuery from "../review/queries/useReviewsInfiniteQuery";
import { ReviewFilterState } from "../review/types";

export default function ReviewsPage(): JSX.Element {
  const [filter, setFilter] = React.useState<ReviewFilterState>(
    defaultReviewFilterState
  );

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetching
  } = useReviewsInfiniteQuery(filter);

  const reviews =
    compact(data?.pages.flatMap(page => page.reviews?.nodes)) ?? [];

  return (
    <Layout container>
      <Stack>
        <ReviewFilter filter={filter} setFilter={setFilter} />
        <ReviewList
          defaultCount={10}
          isLoading={isLoading}
          showImage={true}
          reviews={reviews}
        />
        <Button isLoading={isFetching} onClick={() => fetchNextPage()}>
          Fetch More
        </Button>
      </Stack>
    </Layout>
  );
}
