import { useQuery, UseQueryResult } from "react-query";
import { UserAuth } from "../types";

export async function fetchMeData(): Promise<UserAuth | null> {
  const response = await fetch("/api/me");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const MeQueryKey = "me";

export default function useMeQuery(): UseQueryResult<UserAuth | null, Error> {
  return useQuery(MeQueryKey, fetchMeData, { retry: 0 });
}
