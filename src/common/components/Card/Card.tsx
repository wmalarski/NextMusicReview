import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export default function Card(props: BoxProps): JSX.Element {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderWidth="2px"
      padding="1rem"
      borderRadius="1rem"
      shadow="md"
      {...props}
    />
  );
}
