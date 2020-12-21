import { useQuery, UseQueryResult } from "react-query";
import { UserAuth } from "../types";

export async function fetchMeData(): Promise<UserAuth> {
  const response = await fetch("/api/me");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const MeQueryKey = "me";

export default function useMeQuery(): UseQueryResult<UserAuth, Error> {
  return useQuery(MeQueryKey, fetchMeData);
}
