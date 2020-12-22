import {
  DrawerBody,
  DrawerHeader,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text
} from "@chakra-ui/react";
import range from "lodash/range";
import React from "react";
import { useAlbumDetailsQuery } from "../../graphql/types";
import { AlbumItem } from "../types";

export interface AlbumDrawerContentProps {
  album: AlbumItem;
}

export default function AlbumDrawerContent(
  props: AlbumDrawerContentProps
): JSX.Element {
  const { album } = props;
  const { details, name, year, performer } = album;

  const image = details?.image.find(img => img.size === "mega");

  const { data: detailsData } = useAlbumDetailsQuery({ id: album.id });

  return (
    <>
      <DrawerHeader>
        {name}
        <Heading as="h5" size="sm">
          {performer?.name}
        </Heading>
        <Heading as="h6" size="xs">
          {year}
        </Heading>
      </DrawerHeader>

      <DrawerBody>
        <Stack>
          {image?.url && <Image src={image.url} alt={name} />}
          {detailsData ? (
            <Stack>
              <Text
                fontSize="md"
                dangerouslySetInnerHTML={{
                  __html: detailsData.album.details?.wiki?.summary ?? ""
                }}
              />
              <Text
                fontSize="sm"
                dangerouslySetInnerHTML={{
                  __html: detailsData.album.details?.wiki?.content ?? ""
                }}
              />
            </Stack>
          ) : (
            <Stack>
              {range(0, 6).map(index => (
                <Skeleton key={index} height="20px" />
              ))}
            </Stack>
          )}
        </Stack>
      </DrawerBody>
    </>
  );
}
