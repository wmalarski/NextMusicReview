import { Button, ButtonGroup, Stack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import TextInput from "../../common/components/textInput";
import {
  PerformerDetailsFragment,
  PerformerDetailsQuery,
  useUpdatePerformerMutation
} from "../../graphql/types";

export interface PerformerUpdateFormResults {
  name: string;
}

export interface PerformerUpdateFormProps {
  performer: PerformerDetailsFragment;
  firstFieldRef: React.RefObject<HTMLInputElement>;
  onCancel: () => void;
}

export default function PerformerUpdateForm(
  props: PerformerUpdateFormProps
): JSX.Element {
  const { performer, firstFieldRef, onCancel } = props;
  const { name: initName, id } = performer;

  const queryClient = useQueryClient();

  const [name, setName] = useState<string>(initName);
  const key = ["PerformerDetails", { id }];

  const toast = useToast();

  const { mutate, isLoading } = useUpdatePerformerMutation({
    onMutate: async variables => {
      await queryClient.cancelQueries(key);
      const previous = queryClient.getQueryData<PerformerDetailsQuery>(key);
      queryClient.setQueryData<PerformerDetailsQuery | undefined>(
        key,
        old =>
          old && {
            performer: {
              ...old.performer,
              name: variables.input.name
            }
          }
      );
      return { previous };
    },
    onSuccess() {
      onCancel();
      toast({
        description: "Performer updated",
        isClosable: true,
        position: "bottom",
        status: "success",
        title: "Success"
      });
    },
    onError(error, variables, context: any) {
      queryClient.setQueryData(key, context.previous);
      toast({
        description: String(error),
        isClosable: true,
        position: "bottom",
        status: "error",
        title: "Save not completed"
      });
    },
    onSettled() {
      queryClient.invalidateQueries(key);
    }
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        mutate({ input: { id, name } });
      }}
    >
      <Stack spacing={4}>
        <TextInput
          label="Name"
          id="performer-name"
          ref={firstFieldRef}
          defaultValue=""
          value={name}
          onChange={setName}
        />
        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button isLoading={isLoading} variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button isLoading={isLoading} type="submit" colorScheme="gray">
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    </form>
  );
}
