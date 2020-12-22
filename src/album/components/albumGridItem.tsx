import { Box, Center, Image as ChakraImage } from "@chakra-ui/react";
import React from "react";
import { AlbumListItemFragment } from "../../graphql/types";

export interface AlbumGridItemProps {
  album: AlbumListItemFragment;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AlbumGridItem(props: AlbumGridItemProps): JSX.Element {
  const { album, setSelectedId } = props;
  const { id, name, details } = album;

  const image = details?.image.find(img => img.size === "mega");

  return (
    <Box
      bg="gray.100"
      borderColor="gray.100"
      borderWidth="2px"
      _hover={{ borderColor: "teal.500" }}
      onClick={() => setSelectedId(curr => (curr === id ? null : id))}
    >
      <Center>
        {image?.url && <ChakraImage src={image.url} alt={name} />}
      </Center>
    </Box>
  );
}
