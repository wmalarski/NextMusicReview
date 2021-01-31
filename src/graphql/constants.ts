export const REMOTE_ENDPOINT = "http://rocky-tor-45485.herokuapp.com/graphql/";

export const GRAPHQL_ENDPOINT =
  typeof window === "undefined"
    ? REMOTE_ENDPOINT
    : `${window.location.origin}/api/graphql`;
