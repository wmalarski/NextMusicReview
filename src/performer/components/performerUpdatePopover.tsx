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
import React from "react";
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

  return (
    <Popover
      isOpen={isOpen}
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
        <PerformerUpdateForm performer={performer} onCancel={onClose} />
      </PopoverContent>
    </Popover>
  );
}
