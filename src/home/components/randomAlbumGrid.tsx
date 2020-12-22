import React from "react";
import useRandomAlbumsQuery from "../queries/useRandomAlbumsQuery";

export default function RandomAlbumGrid(): JSX.Element {
  const { data } = useRandomAlbumsQuery();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
