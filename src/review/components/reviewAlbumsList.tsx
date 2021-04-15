import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import { range } from "../../common/functions";
import { AlbumGridItemFragment } from "../../graphql/types";
import { ReviewListItemArgs } from "../types";
import ReviewListItem from "./reviewListItem";

export interface ReviewAlbumPair {
  review: ReviewListItemArgs;
  album: AlbumGridItemFragment;
}

export interface ReviewAlbumsListProps {
  isLoading: boolean;
  showImage: boolean;
  defaultCount: number;
  pairs?: ReviewAlbumPair[];
}

export default function ReviewAlbumsList(
  props: ReviewAlbumsListProps
): JSX.Element {
  const { pairs, isLoading, defaultCount, showImage } = props;

  return (
    <Stack>
      {isLoading
        ? range(0, defaultCount).map(index => (
            <Box key={index}>
              <Skeleton height="150px" />
            </Box>
          ))
        : pairs?.map(pair => (
            <ReviewListItem
              key={pair.review.id}
              showImage={showImage}
              review={{ album: pair.album, ...pair.review }}
            />
          ))}
    </Stack>
  );
}
