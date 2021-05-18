import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import React from "react";
import AlbumGridItem from "../../../album/components/AlbumGridItem/albumGridItem";
import Card from "../../../common/components/Card/Card";
import { range } from "../../../common/functions";
import { AlbumGridItemFragment } from "../../../graphql/types";
import AlbumDrawer from "../AlbumDrawer/AlbumDrawer";

export interface AlbumGridProps {
  isLoading: boolean;
  defaultCount: number;
  albums?: AlbumGridItemFragment[];
}

export default function AlbumGrid(props: AlbumGridProps): JSX.Element {
  const { albums, isLoading, defaultCount } = props;

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selectedAlbum = React.useMemo(
    () => albums?.find(album => album.id === selectedId),
    [albums, selectedId]
  );

  return (
    <>
      <SimpleGrid minChildWidth="230px" spacing="10px">
        {isLoading
          ? range(0, defaultCount).map(index => (
              <Card key={index} height="250px">
                <Skeleton height="100%" width="100%" />
              </Card>
            ))
          : albums?.map(album => (
              <AlbumGridItem
                key={album.id}
                album={album}
                imageHeight="190px"
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
