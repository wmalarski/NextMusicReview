import { ChatIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Card from "../../common/components/card";
import { AlbumGridItemFragment } from "../../graphql/types";
import ReviewForm from "./reviewForm";

export interface ReviewEditAccordionProps {
  album: AlbumGridItemFragment;
}

export default function ReviewEditAccordion(
  props: ReviewEditAccordionProps
): JSX.Element {
  const { album } = props;
  const { id } = album;

  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<ChatIcon />}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        Review
      </Button>
      {isOpen && (
        <Card m={3}>
          <ReviewForm albumId={id} onCancel={onClose} />
        </Card>
      )}
    </>
  );
}
