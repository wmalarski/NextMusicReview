import { Text } from "@chakra-ui/react";
import React from "react";

export default function MenuText(props: {
  children: React.ReactNode;
}): JSX.Element {
  const { children } = props;
  return (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Text>
  );
}
