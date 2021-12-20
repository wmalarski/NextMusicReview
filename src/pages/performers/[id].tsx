import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Layout from "../../common/components/Layout/Layout";
import { usePerformerDetailsQuery } from "../../graphql/types";
import PerformerDetails from "../../performer/components/PerformerDetails/PerformerDetails";

export interface PerformerDetailsPageProps {
  id: string;
}

export default function PerformerDetailsPage(
  props: PerformerDetailsPageProps
): JSX.Element {
  const { id } = props;

  const { data } = usePerformerDetailsQuery({ id });

  return (
    <Layout container>
      <PerformerDetails query={data} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps<
  PerformerDetailsPageProps
> = async ({ params }) => {
  const id = Array.isArray(params?.id) ? undefined : params?.id;

  if (!id) return { notFound: true };

  return { props: { id } };
};
