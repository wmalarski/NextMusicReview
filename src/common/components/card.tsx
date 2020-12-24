import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export default function Card(props: BoxProps): JSX.Element {
  return (
    <Box
      alignItems="center"
      borderColor="gray.100"
      borderWidth="2px"
      padding="20px"
      spacing="20px"
      {...props}
    />
  );
}
