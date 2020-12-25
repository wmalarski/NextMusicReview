export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const url =
      typeof window === "undefined"
        ? "https://next-music-rating.azurewebsites.net/graphql"
        : `${window.location.origin}/api/graphql`;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
