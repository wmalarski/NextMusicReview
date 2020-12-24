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
import React, { useRef } from "react";
import ReviewForm from "./reviewForm";

export interface ReviewPopoverProps {
  albumId: string;
}

export default function ReviewPopover(props: ReviewPopoverProps): JSX.Element {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // const [] = useCreateReviewMutation();

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button size="sm" leftIcon={<ChatIcon />}>
          Review
        </Button>
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <ReviewForm
          firstFieldRef={firstFieldRef}
          onCancel={onClose}
          onSubmit={res => {
            console.log("res", res);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
