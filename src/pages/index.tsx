import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import AlbumGrid from "../album/components/albumGrid";
import Layout from "../common/components/layout";
import { useRandomAlbumsQuery } from "../graphql/types";
import { LoginPagePathKey } from "../users/types";

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

  const router = useRouter();

  React.useEffect(() => {
    const loginPath = localStorage.getItem(LoginPagePathKey);
    if (!loginPath) return;
    localStorage.removeItem(LoginPagePathKey);
    router.push(loginPath);
  }, [router]);

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
