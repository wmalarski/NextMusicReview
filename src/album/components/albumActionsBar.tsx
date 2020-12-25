import { SearchIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { AlbumGridItemFragment } from "../../graphql/types";
import ReviewPopover from "../../review/components/reviewPopover";
import AlbumDeleteButton from "./albumDeleteButton";
import AlbumPopover from "./albumPopover";

export interface AlbumActionsBarProps {
  album?: AlbumGridItemFragment | null;
}

function buildLink(album: AlbumGridItemFragment): string {
  const { performer, name } = album ?? {};
  const value = `${performer?.name ?? ""} ${name}`.replace(" ", "+");
  return `https://www.youtube.com/results?search_query=${value}`;
}

export default function AlbumActionsBar(
  props: AlbumActionsBarProps
): JSX.Element | null {
  const { album } = props;

  if (!album) return null;

  return (
    <HStack>
      <Button
        leftIcon={<SearchIcon />}
        onClick={() => {
          if (typeof window === "undefined") return;
          window.open(buildLink(album), "_blank");
        }}
      >
        YouTube
      </Button>
      <AlbumDeleteButton album={album} />
      <AlbumPopover album={album} />
      <ReviewPopover album={album} />
    </HStack>
  );
}
