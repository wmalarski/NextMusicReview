import { Box, Heading, HStack, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { AlbumSearchHit } from "../types";

export interface AlbumHitProps {
  hit: AlbumSearchHit;
}

export default function SearchHit(props: AlbumHitProps): JSX.Element {
  const { hit } = props;
  const { name, performer, year, id, performerId, imageUrl } = hit;

  return (
    <HStack>
      <Box>{imageUrl && <Image src={imageUrl} />}</Box>
      <Box>
        <NextLink href={`/albums/${id}`}>
          <Link>{name}</Link>
        </NextLink>
        <Heading as="h5" size="sm">
          <NextLink href={`/performers/${performerId}`}>
            <Link>{performer}</Link>
          </NextLink>
        </Heading>
        {year !== 0 && (
          <Heading as="h6" size="xs">
            {year}
          </Heading>
        )}
      </Box>
    </HStack>
  );
}
