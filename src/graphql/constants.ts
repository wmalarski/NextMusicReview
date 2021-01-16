export const AZURE_ENDPOINT =
  "https://next-music-rating.azurewebsites.net/graphql";

export const GRAPHQL_ENDPOINT =
  typeof window === "undefined"
    ? AZURE_ENDPOINT
    : `${window.location.origin}/api/graphql`;
