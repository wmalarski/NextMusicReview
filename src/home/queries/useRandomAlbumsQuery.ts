import { useQuery, UseQueryResult } from "react-query";
import fetcher from "../../graphql/fetcher";
import {
  RandomAlbumsDocument,
  RandomAlbumsQuery,
  RandomAlbumsQueryVariables
} from "../../graphql/types";

export const RandomAlbumsQueryKey = "random";

export default function useRandomAlbumsQuery(): UseQueryResult<
  RandomAlbumsQuery,
  Error
> {
  const query = RandomAlbumsDocument.loc?.source.body ?? "";
  return useQuery(
    RandomAlbumsQueryKey,
    fetcher<RandomAlbumsQuery, RandomAlbumsQueryVariables>(query, { count: 20 })
  );
}
