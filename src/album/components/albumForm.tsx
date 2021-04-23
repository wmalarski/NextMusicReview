import { Alert, AlertIcon, Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import StepperInput from "../../common/components/stepperInput";
import TextInput from "../../common/components/textInput";
import { AlbumGridItemFragment } from "../../graphql/types";
import useUpdateAlbum from "../queries/useUpdateAlbum";

export interface AlbumFormData {
  name: string;
  year: number;
}

const formSchema = yup.object().shape({
  name: yup.string().required(),
  year: yup.number().integer().required().min(1950).max(2025)
});

export interface AlbumFormProps {
  album: AlbumGridItemFragment;
  onCancel: () => void;
}

export default function AlbumForm(props: AlbumFormProps): JSX.Element {
  const { album, onCancel } = props;
  const { id, name: initName, year: initYear, performer, mBid } = album;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AlbumFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: { name: initName, year: initYear },
    shouldFocusError: true
  });

  const { mutate, isLoading } = useUpdateAlbum({ album, onCancel });

  const onSubmit = (data: AlbumFormData): void =>
    mutate({ input: { id, mBid, performer: performer?.id ?? "", ...data } });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <TextInput
          label="Name"
          id="album-name"
          role="textbox"
          defaultValue={initName}
          {...register("name")}
        />
        {errors.name && (
          <Alert status="error">
            <AlertIcon />
            {errors.name?.message}
          </Alert>
        )}

        <StepperInput
          label="Year"
          id="album-year"
          min={1950}
          max={2025}
          defaultValue={initYear}
          inputProps={register("year")}
        />
        {errors.year && (
          <Alert status="error">
            <AlertIcon />
            {errors.year?.message}
          </Alert>
        )}

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
