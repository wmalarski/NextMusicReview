import React from "react";
import { PerformerDetailsQuery } from "../../graphql/types";

export interface PerformerDetailsProps {
  id: string;
  details: PerformerDetailsQuery;
}

export default function PerformerDetails(
  props: PerformerDetailsProps
): JSX.Element {
  const { details } = props;

  return <pre>{JSON.stringify(details, null, 2)}</pre>;
  // const { data, isLoading } = useRandomAlbumsQuery({ count: AlbumCount });
  // const albums = data?.randomAlbums;

  // const [selectedId, setSelectedId] = React.useState<string | null>(null);
  // const selectedAlbum = React.useMemo(
  //   () => albums?.find(album => album.id === selectedId),
  //   [albums, selectedId]
  // );

  // return (
  //   <>
  //     <SimpleGrid minChildWidth="250px" spacing="10px">
  //       {isLoading
  //         ? range(0, AlbumCount).map(index => (
  //             <Box key={index} bg="tomato" height="250px">
  //               <Spinner />
  //             </Box>
  //           ))
  //         : albums?.map(album => (
  //             <AlbumGridItem
  //               key={album.id}
  //               album={album}
  //               setSelectedId={setSelectedId}
  //             />
  //           ))}
  //     </SimpleGrid>

  //     <AlbumDrawer
  //       selectedAlbum={selectedAlbum}
  //       setSelectedId={setSelectedId}
  //     />
  //   </>
  // );
}
