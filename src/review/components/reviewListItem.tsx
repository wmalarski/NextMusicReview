import {
  Box,
  Center,
  Heading,
  HStack,
  Image as ChakraImage,
  Link,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Card from "../../common/components/card";
import { ReviewListItemArgs } from "../types";

export interface ReviewListItemProps {
  showImage: boolean;
  review: ReviewListItemArgs;
}

export default function ReviewListItem(
  props: ReviewListItemProps
): JSX.Element {
  const { review, showImage } = props;
  const { createdAt, rating, text, album } = review;
  const { id, details, name, performer, year } = album ?? {};

  const image = details?.image.find(img => img.size === "mega");

  return (
    <Card>
      <HStack>
        <Box>
          {showImage && (
            <Center>
              <Card>
                {image?.url && <ChakraImage src={image.url} alt={name} />}
              </Card>
            </Center>
          )}
        </Box>
        <Stack flexGrow={1}>
          <Heading as="h2" size="lg">
            <NextLink href={`/albums/${id}`}>
              <Link>{name}</Link>
            </NextLink>
          </Heading>
          <Heading as="h4" size="md">
            <NextLink href={`/performers/${performer?.id}`}>
              <Link>{performer?.name}</Link>
            </NextLink>
          </Heading>
          <Heading as="h6" size="xs">
            {year}
          </Heading>
          <Text>{createdAt}</Text>
          <Text>{text}</Text>
          <Slider
            aria-label="rating-slider"
            defaultValue={rating}
            isDisabled={true}
            min={0}
            max={10}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={9}>{rating}</SliderThumb>
          </Slider>
        </Stack>
      </HStack>
    </Card>
  );
}
