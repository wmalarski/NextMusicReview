import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack
} from "@chakra-ui/react";
import React, { useState } from "react";
import TextInput from "../../common/components/textInput";

export interface ReviewFormResults {
  text: string;
  rating: number;
}

export interface ReviewFormProps {
  firstFieldRef: React.RefObject<HTMLInputElement>;
  onCancel: () => void;
  onSubmit: (result: ReviewFormResults) => void;
}

export default function ReviewForm(props: ReviewFormProps): JSX.Element {
  const { firstFieldRef, onCancel, onSubmit } = props;

  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(5);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmit({ text, rating });
      }}
    >
      <Stack spacing={4}>
        <TextInput
          label="Review"
          id="review-text"
          ref={firstFieldRef}
          defaultValue=""
          inputProps={{
            value: text,
            onChange: event => setText(event.target.value)
          }}
        />
        <FormControl>
          <FormLabel htmlFor={"slider-rating"}>Rating</FormLabel>
          <Slider
            id="slider-rating"
            aria-label="slider-rating"
            min={0}
            max={10}
            step={0.1}
            value={rating}
            onChange={setRating}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize="30px">{rating}</SliderThumb>
          </Slider>
        </FormControl>

        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" colorScheme="gray">
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    </form>
  );
}
