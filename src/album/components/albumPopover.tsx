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
import { AlbumGridItemFragment } from "../../graphql/types";
import AlbumForm from "./albumForm";

export interface AlbumPopoverProps {
  album: AlbumGridItemFragment;
}

export default function AlbumPopover(props: AlbumPopoverProps): JSX.Element {
  const { album } = props;

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
        <Button size="sm" leftIcon={<EditIcon />}>
          Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <AlbumForm
          firstFieldRef={firstFieldRef}
          album={album}
          onCancel={onClose}
        />
      </PopoverContent>
    </Popover>
  );
}
