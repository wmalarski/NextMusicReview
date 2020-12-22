import React from "react";
import Layout from "../common/components/layout";
import RandomAlbumGrid from "../home/components/randomAlbumGrid";

export default function HomePage(): JSX.Element {
  return (
    <Layout>
      <RandomAlbumGrid />
    </Layout>
  );
}
