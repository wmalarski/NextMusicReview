import {
  DrawerBody,
  DrawerHeader,
  Heading,
  Image,
  Link,
  Stack
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import WikiText from "../../common/components/wikiText";
import {
  AlbumGridItemFragment,
  useAlbumDetailsQuery
} from "../../graphql/types";

export interface AlbumDrawerContentProps {
  album: AlbumGridItemFragment;
}

export default function AlbumDrawerContent(
  props: AlbumDrawerContentProps
): JSX.Element {
  const { album } = props;
  const { id, details, name, year, performer } = album;

  const image = details?.image.find(img => img.size === "mega");

  const { data, isLoading } = useAlbumDetailsQuery({ id: album.id });

  return (
    <>
      <DrawerHeader>
        <Heading size="lg" variant="primary">
          <NextLink href={`/albums/${id}`}>
            <Link>{name}</Link>
          </NextLink>
        </Heading>
        <Heading as="h5" size="sm">
          <NextLink href={`/performers/${performer?.id}`}>
            <Link>{performer?.name}</Link>
          </NextLink>
        </Heading>
        {year !== 0 && (
          <Heading as="h6" size="xs">
            {year}
          </Heading>
        )}
      </DrawerHeader>

      <DrawerBody>
        <Stack spacing={10}>
          {image?.url && <Image src={image.url} alt={name} />}
          <WikiText isLoading={isLoading} wiki={data?.album.details?.wiki} />
        </Stack>
      </DrawerBody>
    </>
  );
}
