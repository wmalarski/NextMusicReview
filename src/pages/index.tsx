import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import AlbumGrid from "../album/components/albumGrid";
import Layout from "../common/components/layout";
import { useRandomAlbumsQuery } from "../graphql/types";

const AlbumCount = 20;

export default function HomePage(): JSX.Element {
  const { data, isLoading, refetch } = useRandomAlbumsQuery(
    {
      count: AlbumCount
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  );

  return (
    <Layout container>
      <Stack>
        <AlbumGrid
          albums={data?.randomAlbums}
          defaultCount={AlbumCount}
          isLoading={isLoading}
        />
        <Button onClick={() => refetch()}>Reload</Button>
      </Stack>
    </Layout>
  );
}
