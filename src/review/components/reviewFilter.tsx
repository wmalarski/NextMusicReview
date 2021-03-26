import {
  Box,
  Button,
  HStack,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text
} from "@chakra-ui/react";
import React from "react";
import { ReviewSortInput, SortEnumType } from "../../graphql/types";
import { ReviewFilterState } from "../types";

export interface ReviewFilterProps {
  filter: ReviewFilterState;
  setFilter: React.Dispatch<React.SetStateAction<ReviewFilterState>>;
}

export default function ReviewFilter(props: ReviewFilterProps): JSX.Element {
  const { filter, setFilter } = props;

  const [key, setKey] = React.useState<keyof ReviewSortInput | null>(() => {
    const key = Object.keys(filter.sort)[0];
    return key ? (key as keyof ReviewSortInput) : null;
  });
  const [direction, setDirection] = React.useState<SortEnumType>(
    SortEnumType.Asc
  );

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!key) return;
        setFilter(curr => ({
          ...curr,
          sort: { ...curr.sort, [key]: direction }
        }));
      }}
    >
      <HStack>
        <Text>Sort by:</Text>
        <Box>
          <Select
            placeholder="-"
            value={String(key)}
            onChange={event => {
              const value = event.target.value;
              setKey(value === "" ? null : (value as keyof ReviewSortInput));
            }}
          >
            <option value="createdAt">Created At</option>
            <option value="rating">Rating</option>
          </Select>
        </Box>
        <Box flexGrow={1}>
          <RadioGroup
            onChange={value => setDirection(value as SortEnumType)}
            value={direction}
          >
            <Stack direction="row">
              <Radio value={SortEnumType.Asc}>Asc</Radio>
              <Radio value={SortEnumType.Desc}>Desc</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Button type="submit">Apply</Button>
      </HStack>
    </form>
  );
}
