import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import AlbumDetails from "../../album/components/albumDetails";
import Layout from "../../common/components/layout";
import { fetcher } from "../../graphql/fetcher";
import {
  AlbumDetailsDocument,
  AlbumDetailsQuery,
  AlbumDetailsQueryVariables,
  AlbumReviewsDocument,
  AlbumReviewsQuery,
  AlbumReviewsQueryVariables
} from "../../graphql/types";

export interface AlbumDetailsPageProps {
  id: string;
  detailsQuery: AlbumDetailsQuery;
  reviewsQuery: AlbumReviewsQuery;
}

export default function AlbumDetailsPage(
  props: AlbumDetailsPageProps
): JSX.Element {
  const { id, detailsQuery, reviewsQuery } = props;

  return (
    <Layout container>
      <AlbumDetails
        id={id}
        detailsQuery={detailsQuery}
        reviewsQuery={reviewsQuery}
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

  const detailsQuery = await fetcher<
    AlbumDetailsQuery,
    AlbumDetailsQueryVariables
  >(AlbumDetailsDocument, { id })();
  const reviewsQuery = await fetcher<
    AlbumReviewsQuery,
    AlbumReviewsQueryVariables
  >(AlbumReviewsDocument, { id })();

  return { props: { id, detailsQuery, reviewsQuery } };
};
