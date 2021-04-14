import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  useToast
} from "@chakra-ui/react";
import React from "react";
import { useQueryClient } from "react-query";
import TextInput from "../../common/components/textInput";
import { useCreateReviewMutation } from "../../graphql/types";

export interface ReviewFormResults {
  text: string;
  rating: number;
}

export interface ReviewFormProps {
  albumId: string;
  firstFieldRef: React.RefObject<HTMLInputElement>;
  onCancel: () => void;
}

export default function ReviewForm(props: ReviewFormProps): JSX.Element {
  const { albumId, firstFieldRef, onCancel } = props;

  const queryClient = useQueryClient();

  const [text, setText] = React.useState<string>("");
  const [rating, setRating] = React.useState<number>(5);

  const toast = useToast();

  const { mutate, isLoading } = useCreateReviewMutation({
    onSuccess() {
      queryClient.invalidateQueries(["AlbumReviews", { id: albumId }]);
      onCancel();
      toast({
        description: "Review added",
        isClosable: true,
        position: "bottom",
        status: "success",
        title: "Success"
      });
    },
    onError(error) {
      toast({
        description: String(error),
        isClosable: true,
        position: "bottom",
        status: "error",
        title: "Error"
      });
    }
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        mutate({ input: { album: albumId, text, rating } });
      }}
    >
      <Stack spacing={4}>
        <TextInput
          label="Review"
          id="review-text"
          ref={firstFieldRef}
          defaultValue=""
          value={text}
          onChange={setText}
        />
        <FormControl>
          <FormLabel htmlFor={"slider-rating"}>{`Rating ${rating}`}</FormLabel>
          <Slider
            id="slider-rating"
            aria-label="slider-rating"
            min={0}
            max={10}
            step={0.1}
            value={rating}
            onChange={val => {
              console.log("setRating", val);
              setRating(val);
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>

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
