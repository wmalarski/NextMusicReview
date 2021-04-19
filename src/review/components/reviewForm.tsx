import { Alert, AlertIcon, Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import StepperInput from "../../common/components/stepperInput";
import TextInput from "../../common/components/textInput";
import useCreateReview from "../queries/useCreateReview";

export interface ReviewFormResults {
  text: string;
  rating: number;
}

const formSchema = yup.object().shape({
  text: yup.string(),
  rating: yup.number().min(0).max(10).required()
});

export interface ReviewFormProps {
  albumId: string;
  onCancel: () => void;
}

export default function ReviewForm(props: ReviewFormProps): JSX.Element {
  const { albumId, onCancel } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ReviewFormResults>({
    resolver: yupResolver(formSchema),
    defaultValues: { text: "", rating: 5 },
    shouldFocusError: true
  });

  const { mutate, isLoading } = useCreateReview({ albumId, onCancel });

  const onSubmit = (data: ReviewFormResults): void =>
    mutate({ input: { album: albumId, ...data } });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <TextInput label="Review" id="review-text" {...register("text")} />
        {errors.text && (
          <Alert status="error">
            <AlertIcon />
            {errors.text.message}
          </Alert>
        )}

        <StepperInput
          step={0.1}
          min={0}
          max={10}
          label="Rating"
          id="rating-value"
          inputProps={register("rating")}
        />
        {errors.rating && (
          <Alert status="error">
            <AlertIcon />
            {errors.rating.message}
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
