import { Button, Center, Stack } from "@chakra-ui/react";
import compact from "lodash/compact";
import React, { useState } from "react";
import Layout from "../common/components/layout";
import ReviewFilter from "../review/components/reviewFilter";
import ReviewList from "../review/components/reviewList";
import { defaultReviewFilterState } from "../review/defaults";
import useReviewsInfiniteQuery from "../review/queries/useReviewsInfiniteQuery";
import { ReviewFilterState } from "../review/types";

export default function ReviewsPage(): JSX.Element {
  const [filter, setFilter] = useState<ReviewFilterState>(
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
        <Center>
          <Button isLoading={isFetching} onClick={() => fetchNextPage()}>
            Fetch More
          </Button>
        </Center>
      </Stack>
    </Layout>
  );
}
