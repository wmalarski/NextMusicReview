import { Button, FormLabel, HStack, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

export interface SearchArgs {
  search: string;
}

export interface SearchInputProps {
  search: string;
  isLoading: boolean;
  onSearch: (search: string) => void;
}

export default function SearchInput(props: SearchInputProps): JSX.Element {
  const { search, isLoading, onSearch } = props;

  const { register, handleSubmit } = useForm<SearchArgs>({
    defaultValues: { search }
  });

  const onSubmit = (args: SearchArgs): void => onSearch(args.search);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
        <FormLabel htmlFor="search">Search</FormLabel>
        <Input placeholder="Search" {...register("search")} />
        <Button mt={4} isLoading={isLoading} type="submit">
          Submit
        </Button>
      </HStack>
    </form>
  );
}
