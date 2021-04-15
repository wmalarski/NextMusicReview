import { EditIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Card from "../../common/components/card";
import { AlbumGridItemFragment } from "../../graphql/types";
import AlbumForm from "./albumForm";

export interface AlbumEditAccordionProps {
  album: AlbumGridItemFragment;
}

export default function AlbumEditAccordion(
  props: AlbumEditAccordionProps
): JSX.Element {
  const { album } = props;

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        leftIcon={<EditIcon />}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        Edit
      </Button>
      {isOpen && (
        <Card m={3}>
          <AlbumForm
            firstFieldRef={firstFieldRef}
            album={album}
            onCancel={onClose}
          />
        </Card>
      )}
    </>
  );
}
