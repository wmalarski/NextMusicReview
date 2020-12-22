import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { range } from "lodash";
import React from "react";
import AlbumDrawer from "../../album/components/albumDrawer";
import AlbumGridItem from "../../album/components/albumGridItem";
import { useRandomAlbumsQuery } from "../../graphql/types";

const AlbumCount = 20;

export default function RandomAlbumGrid(): JSX.Element {
  const { data, isLoading } = useRandomAlbumsQuery({ count: AlbumCount });
  const albums = data?.randomAlbums;

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selectedAlbum = React.useMemo(
    () => albums?.find(album => album.id === selectedId),
    [albums, selectedId]
  );

  return (
    <>
      <SimpleGrid minChildWidth="250px" spacing="10px">
        {isLoading
          ? range(0, AlbumCount).map(index => (
              <Box key={index} bg="tomato" height="250px">
                <Spinner />
              </Box>
            ))
          : albums?.map(album => (
              <AlbumGridItem
                key={album.id}
                album={album}
                setSelectedId={setSelectedId}
              />
            ))}
      </SimpleGrid>

      <AlbumDrawer
        selectedAlbum={selectedAlbum}
        setSelectedId={setSelectedId}
      />
    </>
  );
}
