import {
  Center,
  Image as ChakraImage,
  Link,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Card from "../../../common/components/Card/Card";
import { AlbumGridItemFragment } from "../../../graphql/types";

export interface AlbumGridItemProps {
  album: AlbumGridItemFragment;
  imageHeight: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AlbumGridItem(props: AlbumGridItemProps): JSX.Element {
  const { album, imageHeight, setSelectedId } = props;
  const { id, name, details, performer, year } = album;

  const image = details?.image.find(img => img.size === "large");

  const hoverStyle = useColorModeValue("lightHover", "darkHover");

  return (
    <Card
      data-testid={`album-grid-item-${id}`}
      _hover={{ layerStyle: hoverStyle }}
      onClick={() => setSelectedId(curr => (curr === id ? null : id))}
    >
      <Stack alignItems="center">
        <Center>
          {image?.url && (
            <ChakraImage height={imageHeight} src={image.url} alt={name} />
          )}
        </Center>
        <Text variant="primary" fontSize="lg" textAlign="center">
          <NextLink href={`/albums/${id}`}>
            <Link
              onClick={event => {
                event.stopPropagation();
              }}
            >
              {name}
            </Link>
          </NextLink>
        </Text>
        <Text fontSize="sm" textAlign="center">
          <NextLink href={`/performers/${performer?.id}`}>
            <Link
              onClick={event => {
                event.stopPropagation();
              }}
            >
              {performer?.name}
            </Link>
          </NextLink>
        </Text>
        {year !== 0 && <Text fontSize="xs">{year}</Text>}
      </Stack>
    </Card>
  );
}
