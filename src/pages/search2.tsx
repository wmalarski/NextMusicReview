import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import AlbumGrid from "../album/components/AlbumGrid/AlbumGrid";
import Layout from "../common/components/Layout/Layout";
import { compact } from "../common/functions";
import SearchInput from "../search/components/SearchInput/SearchInput";
import useAlbumSearchInfiniteQuery from "../search/queries/useAlbumsInfiniteQuery";

const AlbumCount = 20;

export default function InfiniteSearch(): JSX.Element {
  const router = useRouter();

  const { query } = router.query;
  const initialQuery = Array.isArray(query) ? undefined : query;

  const {
    data,
    isLoading,
    search,
    fetchNextPage,
    setSearch
  } = useAlbumSearchInfiniteQuery(initialQuery);

  const albums = React.useMemo(
    () => compact(data?.pages.flatMap(page => page.search?.nodes)),
    [data?.pages]
  );

  const hasNextPage = React.useMemo(() => {
    const infos = data?.pages.map(page => page.search?.pageInfo.hasNextPage);
    if (!infos) return false;
    return infos[infos.length - 1];
  }, [data?.pages]);

  return (
    <Layout container>
      <Stack>
        <SearchInput
          isLoading={isLoading}
          search={search}
          onSearch={(query: string) => {
            setSearch(query);
            if (query.length > 0) {
              router.push(`search2/?query=${query}`, undefined, {
                shallow: true
              });
            }
          }}
        />
        <AlbumGrid
          albums={albums}
          defaultCount={AlbumCount}
          isLoading={isLoading}
        />
        <Button
          disabled={!hasNextPage}
          isLoading={isLoading}
          onClick={() => fetchNextPage()}
        >
          Fetch More
        </Button>
      </Stack>
    </Layout>
  );
}
