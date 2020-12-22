import { Box, Image as ChakraImage } from "@chakra-ui/react";
import React from "react";
import { AlbumItem } from "../types";

export interface AlbumGridItemProps {
  album: AlbumItem;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AlbumGridItem(props: AlbumGridItemProps): JSX.Element {
  const { album, setSelectedId } = props;
  const { id, name, details } = album;

  const image = details?.image.find(img => img.size === "mega");

  return (
    <>
      <Box
        bg="tomato"
        onClick={() => setSelectedId(curr => (curr === id ? null : id))}
      >
        {image?.url && <ChakraImage src={image.url} alt={name} />}
      </Box>
    </>
  );
}
