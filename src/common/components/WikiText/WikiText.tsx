import { Skeleton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Wiki } from "../../../graphql/types";
import { range } from "../../functions";

export interface WikiTextProps {
  isLoading: boolean;
  wiki?: Wiki | null;
}

export default function WikiText(props: WikiTextProps): JSX.Element {
  const { isLoading, wiki } = props;

  return (
    <Stack>
      {!isLoading ? (
        <Stack spacing={5}>
          <Text
            lineHeight="tall"
            fontSize="lg"
            dangerouslySetInnerHTML={{
              __html: wiki?.summary ?? ""
            }}
          />
          <Text
            lineHeight="taller"
            fontSize="md"
            dangerouslySetInnerHTML={{
              __html: wiki?.content ?? ""
            }}
          />
        </Stack>
      ) : (
        <Stack>
          {range(0, 6).map(index => (
            <Skeleton key={index} height="20px" width="100%" />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
