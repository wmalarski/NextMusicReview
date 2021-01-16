import { GRAPHQL_ENDPOINT } from "./constants";

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
): () => Promise<TData> {
  return async (): Promise<TData> => {
    const res = await fetch(GRAPHQL_ENDPOINT, {
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
