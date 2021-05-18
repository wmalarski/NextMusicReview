import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  Stack
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import WikiText from "../../../common/components/WikiText/WikiText";
import { compact } from "../../../common/functions";
import { AlbumDetailsQuery, AlbumReviewsQuery } from "../../../graphql/types";
import ReviewList from "../../../review/components/ReviewList/ReviewList";
import AlbumActionsBar from "../AlbumActionsBar/AlbumActionsBar";

export interface AlbumDetailsProps {
  id: string;
  detailsQuery?: AlbumDetailsQuery;
  reviewsQuery?: AlbumReviewsQuery;
  isLoading: boolean;
}

export default function AlbumDetails(props: AlbumDetailsProps): JSX.Element {
  const { detailsQuery, reviewsQuery, isLoading } = props;

  const { wiki } = detailsQuery?.album?.details ?? {};
  const { album } = reviewsQuery ?? {};
  const { reviews, name, performer, details, year } = album ?? {};

  const image = details?.image.find(img => img.size === "extralarge");

  return (
    <Container maxW="2xl">
      <Stack spacing={10}>
        <HStack>
          {image?.url && <Image src={image.url} alt={name} />}
          <Box alignItems="center" flexGrow={1}>
            <Heading as="h2" size="lg" variant="primary">
              {name}
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
          </Box>
        </HStack>
        <Stack direction={{ base: "column", md: "row" }}>
          <AlbumActionsBar album={album} />
        </Stack>
        <WikiText isLoading={isLoading} wiki={wiki} />
        <Heading as="h4" size="md">
          Reviews
        </Heading>
        <ReviewList
          defaultCount={1}
          isLoading={isLoading}
          showImage={false}
          defaultAlbum={reviewsQuery?.album}
          reviews={compact(reviews?.nodes)}
        />
      </Stack>
    </Container>
  );
}
