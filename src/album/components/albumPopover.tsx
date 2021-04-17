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
import { AlbumGridItemFragment } from "../../graphql/types";
import AlbumForm from "./albumForm";

export interface AlbumPopoverProps {
  album: AlbumGridItemFragment;
}

export default function AlbumPopover(props: AlbumPopoverProps): JSX.Element {
  const { album } = props;

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
        <AlbumForm album={album} onCancel={onClose} />
      </PopoverContent>
    </Popover>
  );
}
