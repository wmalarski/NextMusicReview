import { Center, Image as ChakraImage } from "@chakra-ui/react";
import React from "react";
import Card from "../../common/components/card";
import { AlbumGridItemFragment } from "../../graphql/types";

export interface AlbumGridItemProps {
  album: AlbumGridItemFragment;
  imageHeight: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AlbumGridItem(props: AlbumGridItemProps): JSX.Element {
  const { album, imageHeight, setSelectedId } = props;
  const { id, name, details } = album;

  const image = details?.image.find(img => img.size === "mega");

  return (
    <Card
      _hover={{ borderColor: "teal.500" }}
      onClick={() => setSelectedId(curr => (curr === id ? null : id))}
    >
      <Center>
        {image?.url && (
          <ChakraImage height={imageHeight} src={image.url} alt={name} />
        )}
      </Center>
    </Card>
  );
}
