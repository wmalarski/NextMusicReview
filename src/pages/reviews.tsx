import { Button, Center, Stack } from "@chakra-ui/react";
import compact from "lodash/compact";
import React from "react";
import Layout from "../common/components/layout";
import ReviewList from "../review/components/ReviewList";
import useReviewsInfiniteQuery from "../review/queries/useReviewsInfiniteQuery";

export default function ReviewsPage(): JSX.Element {
  // const { data, isLoading } = useRandomAlbumsQuery({ count: ReviewCount });
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetching
  } = useReviewsInfiniteQuery();

  const reviews =
    compact(data?.pages.flatMap(page => page.reviews?.nodes)) ?? [];

  return (
    <Layout container>
      <Stack>
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
