import React from "react";
import { useRandomAlbumsQuery } from "../../graphql/types";

export default function RandomAlbumGrid(): JSX.Element {
  const { data } = useRandomAlbumsQuery({ count: 20 });
  //& sed -i 's/QueryConfig/UseQueryOptions/g' src/graphql/types.ts
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
