import { Button, Stack } from "@chakra-ui/react";
import compact from "lodash/compact";
import React, { useMemo } from "react";
import AlbumGrid from "../album/components/albumGrid";
import Layout from "../common/components/layout";
import SearchInput from "../search/components/searchInput";
import useAlbumSearchInfiniteQuery from "../search/queries/useAlbumsInfiniteQuery";

const AlbumCount = 20;

export default function InfiniteSearch(): JSX.Element {
  const {
    data,
    isLoading,
    search,
    fetchNextPage,
    setSearch
  } = useAlbumSearchInfiniteQuery();

  const albums = useMemo(
    () => compact(data?.pages.flatMap(page => page.search?.nodes)),
    [data?.pages]
  );

  return (
    <Layout container>
      <Stack>
        <SearchInput search={search} setSearch={setSearch} />
        <AlbumGrid
          albums={albums}
          defaultCount={AlbumCount}
          isLoading={isLoading}
        />
        <Button onClick={() => fetchNextPage()}>Fetch More</Button>
      </Stack>
    </Layout>
  );
}
