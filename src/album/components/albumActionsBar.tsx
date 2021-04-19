import { SearchIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import useMinWidthQuery from "../../common/hooks/useMinBreakpoint";
import { AlbumGridItemFragment } from "../../graphql/types";
import ReviewEditAccordion from "../../review/components/reviewEditAccordion";
import ReviewPopover from "../../review/components/reviewPopover";
import AlbumDeleteButton from "./albumDeleteButton";
import AlbumEditAccordion from "./albumEditAccordion";
import AlbumPopover from "./albumPopover";

export interface AlbumActionsBarProps {
  album?: AlbumGridItemFragment | null;
}

function buildLink(album: AlbumGridItemFragment): string {
  const { performer, name } = album;
  const value = `${performer?.name ?? ""} ${name}`.replace(" ", "+");
  return `https://www.youtube.com/results?search_query=${value}`;
}

export default function AlbumActionsBar(
  props: AlbumActionsBarProps
): JSX.Element | null {
  const { album } = props;

  const isMd = useMinWidthQuery("md");

  if (!album) return null;

  return (
    <>
      <Button
        id="youtube-button"
        leftIcon={<SearchIcon />}
        onClick={() => {
          if (typeof window === "undefined") return;
          window.open(buildLink(album), "_blank");
        }}
      >
        YouTube
      </Button>
      <AlbumDeleteButton album={album} />
      {isMd ? (
        <>
          <AlbumPopover album={album} />
          <ReviewPopover album={album} />
        </>
      ) : (
        <>
          <AlbumEditAccordion album={album} />
          <ReviewEditAccordion album={album} />
        </>
      )}
    </>
  );
}
