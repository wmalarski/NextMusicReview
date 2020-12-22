import { Box } from "@chakra-ui/react";
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
  details: PerformerDetailsQuery;
}

export default function PerformerDetailsPage(
  props: PerformerDetailsPageProps
): JSX.Element {
  const { id, details } = props;

  return (
    <Layout>
      <Box>
        <PerformerDetails id={id} details={details} />
      </Box>
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

  const details = await fetcher<
    PerformerDetailsQuery,
    PerformerDetailsQueryVariables
  >(PerformerDetailsDocument, { id })();

  return { props: { id, details } };
};
