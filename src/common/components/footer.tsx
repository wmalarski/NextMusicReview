import { Center, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Footer(): JSX.Element {
  return (
    <footer>
      <Center>
        <HStack spacing="3px">
          <Text>© {new Date().getFullYear()}, Built with </Text>
          <Link href="https://nextjs.org/">NextJS,</Link>
          <Link href="https://www.typescriptlang.org">Typescript</Link>
          <Text>and</Text>
          <Link href="https://chakra-ui.com">Chakra-ui</Link>
        </HStack>
      </Center>
    </footer>
  );
}
