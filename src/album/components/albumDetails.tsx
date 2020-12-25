import { Box, Heading, HStack, Image, Link, Stack } from "@chakra-ui/react";
import compact from "lodash/compact";
import NextLink from "next/link";
import React from "react";
import Card from "../../common/components/card";
import WikiText from "../../common/components/wikiText";
import { AlbumDetailsQuery, AlbumReviewsQuery } from "../../graphql/types";
import ReviewList from "../../review/components/reviewList";
import AlbumActionsBar from "./albumActionsBar";

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
    <Stack>
      <Stack display="flex" justify="space-between" wrap="wrap">
        <HStack>
          <Card>{image?.url && <Image src={image.url} alt={name} />}</Card>
          <Box alignItems="center" flexGrow={1}>
            <Heading as="h2" size="lg">
              {name}
            </Heading>
            <Heading as="h4" size="md">
              <NextLink href={`/performers/${performer?.id}`}>
                <Link>{performer?.name}</Link>
              </NextLink>
            </Heading>
            <Heading as="h6" size="xs">
              {year}
            </Heading>
          </Box>
        </HStack>
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
  );
}
