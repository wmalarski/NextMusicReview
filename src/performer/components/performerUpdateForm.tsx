import { Alert, AlertIcon, Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TextInput from "../../common/components/textInput";
import { PerformerDetailsFragment } from "../../graphql/types";
import usePerformerUpdate from "../queries/usePerformerUpdate";

export interface PerformerUpdateFormData {
  name: string;
}

const formSchema = yup.object().shape({
  name: yup.string().required()
});

export interface PerformerUpdateFormProps {
  performer: PerformerDetailsFragment;
  onCancel: () => void;
}

export default function PerformerUpdateForm(
  props: PerformerUpdateFormProps
): JSX.Element {
  const { performer, onCancel } = props;
  const { name: initName, id } = performer;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<PerformerUpdateFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: { name: initName },
    shouldFocusError: true
  });

  const { mutate, isLoading } = usePerformerUpdate({ onCancel, performer });

  const onSubmit = (data: PerformerUpdateFormData): void =>
    mutate({ input: { id, ...data } });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <TextInput
          label="Name"
          id="performer-name"
          defaultValue={initName}
          {...register("name")}
        />
        {errors.name && (
          <Alert status="error">
            <AlertIcon />
            {errors.name?.message}
          </Alert>
        )}

        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button isLoading={isLoading} variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={!isValid}
            isLoading={isLoading}
            type="submit"
            colorScheme="gray"
          >
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    </form>
  );
}
