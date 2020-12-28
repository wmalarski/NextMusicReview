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
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import TextInput from "../../common/components/textInput";
import {
  AlbumGridItemFragment,
  AlbumReviewsQuery,
  useUpdateAlbumMutation
} from "../../graphql/types";

export interface AlbumFormResults {
  text: string;
  rating: number;
}

export interface AlbumFormProps {
  album: AlbumGridItemFragment;
  firstFieldRef: React.RefObject<HTMLInputElement>;
  onCancel: () => void;
}

export default function AlbumForm(props: AlbumFormProps): JSX.Element {
  const { album, firstFieldRef, onCancel } = props;
  const { id, name: initName, year: initYear, performer, mBid } = album;

  const queryClient = useQueryClient();

  const [name, setName] = useState<string>(initName);
  const [year, setYear] = useState<number>(initYear);
  const input = { id, mBid, performer: performer?.id ?? "" };
  const queryKey = ["AlbumReviews", { id }];

  const toast = useToast();

  const { mutate, isLoading } = useUpdateAlbumMutation(
    {
      input: { ...input, year, name }
    },
    {
      onMutate: async variables => {
        await queryClient.cancelQueries(queryKey);
        const previous = queryClient.getQueryData<AlbumReviewsQuery>(queryKey);
        queryClient.setQueryData<AlbumReviewsQuery | undefined>(
          queryKey,
          old =>
            old && {
              album: {
                ...old.album,
                name: variables.input.name,
                year: variables.input.year
              }
            }
        );
        return { previous };
      },
      onSuccess() {
        onCancel();
        toast({
          description: "Album updated",
          isClosable: true,
          position: "bottom",
          status: "success",
          title: "Success"
        });
      },
      onError(error, variables, context: any) {
        queryClient.setQueryData(queryKey, context.previous);
        toast({
          description: String(error),
          isClosable: true,
          position: "bottom",
          status: "error",
          title: "Save not completed"
        });
      },
      onSettled() {
        queryClient.invalidateQueries(queryKey);
      }
    }
  );

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        mutate({ input: { ...input, name, year } });
      }}
    >
      <Stack spacing={4}>
        <TextInput
          label="Name"
          id="album-name"
          ref={firstFieldRef}
          defaultValue=""
          inputProps={{
            value: name,
            onChange: event => setName(event.target.value)
          }}
        />
        <FormControl>
          <FormLabel htmlFor={"slider-year"}>Year</FormLabel>
          <Slider
            id="slider-year"
            aria-label="slider-year"
            min={1950}
            max={2025}
            step={1}
            value={year}
            onChange={setYear}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize="30px">{year}</SliderThumb>
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
