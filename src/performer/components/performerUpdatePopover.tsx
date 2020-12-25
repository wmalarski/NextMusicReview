import { EditIcon } from "@chakra-ui/icons";
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
import { PerformerDetailsFragment } from "../../graphql/types";
import PerformerUpdateForm from "./performerUpdateForm";

export interface PerformerUpdatePopoverProps {
  performer: PerformerDetailsFragment;
}

export default function PerformerUpdatePopover(
  props: PerformerUpdatePopoverProps
): JSX.Element {
  const { performer } = props;

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef<HTMLInputElement>(null);

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
        <Button leftIcon={<EditIcon />}>Edit</Button>
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PerformerUpdateForm
          firstFieldRef={firstFieldRef}
          performer={performer}
          onCancel={onClose}
        />
      </PopoverContent>
    </Popover>
  );
}
