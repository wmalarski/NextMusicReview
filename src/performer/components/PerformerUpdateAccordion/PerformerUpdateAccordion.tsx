import { EditIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Card from "../../../common/components/Card/Card";
import { PerformerDetailsFragment } from "../../../graphql/types";
import PerformerUpdateForm from "../PerformerUpdateForm/PerformerUpdateForm";

export interface PerformerUpdateAccordionProps {
  performer: PerformerDetailsFragment;
}

export default function PerformerUpdateAccordion(
  props: PerformerUpdateAccordionProps
): JSX.Element {
  const { performer } = props;

  const { onOpen, onClose, isOpen } = useDisclosure();

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
          <PerformerUpdateForm performer={performer} onCancel={onClose} />
        </Card>
      )}
    </>
  );
}
