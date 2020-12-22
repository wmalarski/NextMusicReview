import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Layout from "../../common/components/layout";
import { fetcher } from "../../graphql/fetcher";
import {
  PerformerDetailsDocument,
  PerformerDetailsQuery,
  PerformerDetailsQueryVariables
} from "../../graphql/types";
import PerformerDetails from "../../performer/components/performerDetails";

export interface PerformerDetailsPageProps {
  id: string;
  query: PerformerDetailsQuery;
}

export default function PerformerDetailsPage(
  props: PerformerDetailsPageProps
): JSX.Element {
  const { id, query } = props;

  return (
    <Layout container>
      <PerformerDetails id={id} query={query} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps<PerformerDetailsPageProps> = async ({
  params
}) => {
  const id = Array.isArray(params?.id) ? undefined : params?.id;

  if (!id) return { notFound: true };

  const query = await fetcher<
    PerformerDetailsQuery,
    PerformerDetailsQueryVariables
  >(PerformerDetailsDocument, { id })();

  return { props: { id, query } };
};
