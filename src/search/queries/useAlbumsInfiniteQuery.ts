import React from "react";
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

export type FetchAlbumSearchKey = ["search", string];

export type UseAlbumSearchInfiniteQueryResult = UseInfiniteQueryResult<
  AlbumSearchQuery,
  Error
> & {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const fetchAlbumSearch: QueryFunction<
  AlbumSearchQuery,
  FetchAlbumSearchKey
> = ({
  pageParam,
  queryKey
}: QueryFunctionContext<FetchAlbumSearchKey, string>) =>
  fetcher<AlbumSearchQuery, AlbumSearchQueryVariables>(AlbumSearchDocument, {
    after: pageParam ?? null,
    first: 10,
    query: queryKey[1]
  })();

export default function useAlbumSearchInfiniteQuery(): UseAlbumSearchInfiniteQueryResult {
  const [search, setSearch] = React.useState<string>("");

  return {
    search,
    setSearch,
    ...useInfiniteQuery<
      AlbumSearchQuery,
      Error,
      AlbumSearchQuery,
      FetchAlbumSearchKey
    >(["search", search], fetchAlbumSearch, {
      getNextPageParam: lastPage => lastPage.search?.pageInfo.endCursor
    })
  };
}
