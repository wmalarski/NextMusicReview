import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {
  PerformerDetailsFragment,
  useDeletePerformerMutation
} from "../../graphql/types";

export interface PerformerDeleteButtonProps {
  performer: PerformerDetailsFragment;
}

export default function PerformerDeleteButton(
  props: PerformerDeleteButtonProps
): JSX.Element {
  const { performer } = props;
  const { id } = performer;

  const router = useRouter();

  const { mutate, isLoading } = useDeletePerformerMutation(
    { input: { id } },
    {
      onSuccess(data) {
        if (!data.deletePerformer.success) return;
        router.push("/");
      }
    }
  );

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
