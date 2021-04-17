import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { AlbumGridItemFragment } from "../../graphql/types";
import ReviewForm from "./reviewForm";

export interface ReviewPopoverProps {
  album: AlbumGridItemFragment;
}

export default function ReviewPopover(props: ReviewPopoverProps): JSX.Element {
  const { album } = props;
  const { id } = album;

  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button leftIcon={<ChatIcon />}>Review</Button>
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <ReviewForm albumId={id} onCancel={onClose} />
      </PopoverContent>
    </Popover>
  );
}
