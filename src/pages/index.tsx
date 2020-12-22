import React from "react";
import AlbumGrid from "../album/components/albumGrid";
import Layout from "../common/components/layout";
import { useRandomAlbumsQuery } from "../graphql/types";

const AlbumCount = 20;

export default function HomePage(): JSX.Element {
  const { data, isLoading } = useRandomAlbumsQuery({ count: AlbumCount });

  return (
    <Layout container>
      <AlbumGrid
        albums={data?.randomAlbums}
        defaultCount={AlbumCount}
        isLoading={isLoading}
      />
    </Layout>
  );
}
