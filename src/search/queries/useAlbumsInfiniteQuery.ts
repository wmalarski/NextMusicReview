import { useState } from "react";
import {
  QueryFunction,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryResult
} from "react-query";
import { fetcher } from "../../graphql/fetcher";
import {
  AlbumSearchDocument,
  AlbumSearchQuery,
  AlbumSearchQueryVariables
} from "../../graphql/types";
import { SearchProps } from "../types";

export type FetchAlbumSearchKey = ["search", string];

export type UseAlbumSearchInfiniteQueryResult = UseInfiniteQueryResult<
  AlbumSearchQuery,
  Error
> &
  SearchProps;

const fetchAlbumSearch: QueryFunction<AlbumSearchQuery> = ({
  pageParam,
  queryKey
}: QueryFunctionContext<FetchAlbumSearchKey, string>) =>
  fetcher<AlbumSearchQuery, AlbumSearchQueryVariables>(AlbumSearchDocument, {
    after: pageParam ?? null,
    first: 10,
    query: queryKey[1]
  })();

export default function useAlbumSearchInfiniteQuery(): UseAlbumSearchInfiniteQueryResult {
  const [search, setSearch] = useState<string>("");

  return {
    search,
    setSearch,
    ...useInfiniteQuery<AlbumSearchQuery, Error, AlbumSearchQuery>(
      ["search", search],
      fetchAlbumSearch,
      {
        getNextPageParam: lastPage => {
          const { endCursor, hasNextPage } = lastPage.search?.pageInfo ?? {};
          if (!hasNextPage) return null;
          return endCursor;
        }
      }
    )
  };
}
