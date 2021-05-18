import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { PerformerDetailsFragment } from "../../../graphql/types";
import usePerformerDelete from "../../queries/usePerformerDelete";

export interface PerformerDeleteButtonProps {
  performer: PerformerDetailsFragment;
}

export default function PerformerDeleteButton(
  props: PerformerDeleteButtonProps
): JSX.Element {
  const { performer } = props;
  const { id } = performer;

  const { mutate, isLoading } = usePerformerDelete();

  return (
    <Button
      isLoading={isLoading}
      leftIcon={<DeleteIcon />}
      onClick={() => mutate({ input: { id } })}
    >
      Delete
    </Button>
  );
}
