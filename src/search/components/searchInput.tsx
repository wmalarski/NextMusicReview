import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { SearchProps } from "../types";

export interface SearchArgs {
  search: string;
}

export default function SearchInput(props: SearchProps): JSX.Element {
  const { search, setSearch } = props;

  const { register, handleSubmit, formState } = useForm<SearchArgs>({
    defaultValues: { search }
  });
  const { errors } = formState;

  const onSubmit = (args: SearchArgs): void => setSearch(args.search);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
        <FormControl isInvalid={!!errors.search}>
          <FormLabel htmlFor="search">Search</FormLabel>
          <Input placeholder="Search" {...register("search")} />
          <FormErrorMessage>
            {errors.search && errors?.search?.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={formState.isSubmitting} type="submit">
          Submit
        </Button>
      </HStack>
    </form>
  );
}
