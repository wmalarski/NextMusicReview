import { Box, Skeleton, Stack } from "@chakra-ui/react";
import range from "lodash/range";
import React from "react";
import { AlbumGridItemFragment } from "../../graphql/types";
import { ReviewListItemArgs } from "../types";
import ReviewListItem from "./ReviewListItem";

export interface ReviewListProps {
  isLoading: boolean;
  showImage: boolean;
  defaultCount: number;
  reviews?: ReviewListItemArgs[];
  defaultAlbum?: AlbumGridItemFragment;
}

export default function ReviewList(props: ReviewListProps): JSX.Element {
  const { reviews, isLoading, defaultCount, showImage, defaultAlbum } = props;

  return (
    <>
      <Stack>
        {isLoading
          ? range(0, defaultCount).map(index => (
              <Box key={index}>
                <Skeleton height="150px" />
              </Box>
            ))
          : reviews?.map(review => (
              <ReviewListItem
                key={review.id}
                showImage={showImage}
                review={{ album: defaultAlbum, ...review }}
              />
            ))}
      </Stack>
    </>
  );
}
