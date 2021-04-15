import { EditIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Card from "../../common/components/card";
import { PerformerDetailsFragment } from "../../graphql/types";
import PerformerUpdateForm from "./performerUpdateForm";

export interface PerformerUpdateAccordionProps {
  performer: PerformerDetailsFragment;
}

export default function PerformerUpdateAccordion(
  props: PerformerUpdateAccordionProps
): JSX.Element {
  const { performer } = props;

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        w="100%"
        leftIcon={<EditIcon />}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        Edit
      </Button>
      {isOpen && (
        <Card m={3}>
          <PerformerUpdateForm
            firstFieldRef={firstFieldRef}
            performer={performer}
            onCancel={onClose}
          />
        </Card>
      )}
    </>
  );
}
