import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { frontCoverUrl } from "../../../album/utils/covers";
import Card from "../../../common/components/Card/Card";
import { ReviewListItemArgs } from "../../types";

export interface ReviewListItemProps {
  showImage: boolean;
  review: ReviewListItemArgs;
}

export default function ReviewListItem(
  props: ReviewListItemProps
): JSX.Element {
  const { review, showImage } = props;
  const { createdAt, rating, text, album } = review;
  const { id, name, performer, year, mBid } = album ?? {};

  // const image = details?.image.find(img => img.size === "large");

  return (
    <Card alignItems="start">
      <HStack>
        <Box>
          {showImage && (
            <Center>
              {mBid && <Image src={frontCoverUrl({ mBid })} alt={name} />}
            </Center>
          )}
        </Box>
        <Stack flexGrow={1}>
          <Heading as="h2" size="lg" variant="primary">
            <NextLink href={`/albums/${id}`}>
              <Link>{name}</Link>
            </NextLink>
          </Heading>
          <Heading as="h4" size="md">
            <NextLink href={`/performers/${performer?.id}`}>
              <Link>{performer?.name}</Link>
            </NextLink>
          </Heading>
          {year !== 0 && (
            <Heading as="h6" size="xs">
              {year}
            </Heading>
          )}
          <Text>{createdAt}</Text>
          <Text>{text}</Text>
          <Text>{`Rate: ${rating}`}</Text>
        </Stack>
      </HStack>
    </Card>
  );
}
