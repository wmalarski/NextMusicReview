import {
  Center,
  Image as ChakraImage,
  Link,
  Stack,
  Text
} from "@chakra-ui/react";
import NextLink from "next/link";
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
  const { id, name, details, performer, year } = album;

  const image = details?.image.find(img => img.size === "mega");

  return (
    <Card
      _hover={{ borderColor: "teal.500" }}
      onClick={() => setSelectedId(curr => (curr === id ? null : id))}
    >
      <Stack>
        <Center>
          {image?.url && (
            <ChakraImage height={imageHeight} src={image.url} alt={name} />
          )}
        </Center>
        <Text fontSize="md">
          <NextLink href={`/albums/${id}`}>
            <Link>{name}</Link>
          </NextLink>
        </Text>
        <Text fontSize="sm">
          <NextLink href={`/performers/${performer?.id}`}>
            <Link>{performer?.name}</Link>
          </NextLink>
        </Text>
        {year !== 0 && <Text fontSize="xs">{year}</Text>}
      </Stack>
    </Card>
  );
}
