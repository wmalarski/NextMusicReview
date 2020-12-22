import { Skeleton, Stack, Text } from "@chakra-ui/react";
import range from "lodash/range";
import React from "react";
import { Wiki } from "../../graphql/types";

export interface WikiTextProps {
  isLoading: boolean;
  wiki?: Wiki | null;
}

export default function WikiText(props: WikiTextProps): JSX.Element {
  const { isLoading, wiki } = props;
  return (
    <Stack>
      {!isLoading ? (
        <Stack>
          <Text
            fontSize="md"
            dangerouslySetInnerHTML={{
              __html: wiki?.summary ?? ""
            }}
          />
          <Text
            fontSize="sm"
            dangerouslySetInnerHTML={{
              __html: wiki?.content ?? ""
            }}
          />
        </Stack>
      ) : (
        <Stack>
          {range(0, 6).map(index => (
            <Skeleton key={index} height="20px" />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
