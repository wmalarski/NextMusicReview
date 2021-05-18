import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import AlbumDetails from "../../album/components/AlbumDetails/AlbumDetails";
import Layout from "../../common/components/Layout/Layout";
import {
  useAlbumDetailsQuery,
  useAlbumReviewsQuery
} from "../../graphql/types";

export interface AlbumDetailsPageProps {
  id: string;
}

export default function AlbumDetailsPage(
  props: AlbumDetailsPageProps
): JSX.Element {
  const { id } = props;

  const {
    data: detailsQuery,
    isLoading: isDetailsLoading
  } = useAlbumDetailsQuery({ id });
  const {
    data: reviewsQuery,
    isLoading: isReviewsLoading
  } = useAlbumReviewsQuery({ id });

  return (
    <Layout container>
      <AlbumDetails
        id={id}
        detailsQuery={detailsQuery}
        reviewsQuery={reviewsQuery}
        isLoading={isDetailsLoading || isReviewsLoading}
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps<AlbumDetailsPageProps> = async ({
  params
}) => {
  const id = Array.isArray(params?.id) ? undefined : params?.id;

  if (!id) return { notFound: true };

  return { props: { id } };
};
