import React from "react";
import Layout from "../common/components/layout";
import ReviewList from "../review/components/ReviewList";
import useReviewsInfiniteQuery from "../review/queries/useReviewsInfiniteQuery";

const ReviewCount = 20;

export default function ReviewsPage(): JSX.Element {
  // const { data, isLoading } = useRandomAlbumsQuery({ count: ReviewCount });
  const { data, isLoading, error } = useReviewsInfiniteQuery();

  console.log("ReviewsPage", { data, error });

  return (
    <Layout container>
      <ReviewList
        defaultCount={10}
        isLoading={isLoading}
        showImage={true}
        reviews={[]}
      />
    </Layout>
  );
}
