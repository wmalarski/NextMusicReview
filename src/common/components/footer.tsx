import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Footer(): JSX.Element {
  return (
    <footer>
      <Center>
        <VStack>
          <HStack spacing="3px">
            <Link href="https://www.linkedin.com/in/wojciech-malarski-4a1473168/">
              LinkedIn
            </Link>
            <Link href="https://github.com/wmalarski/NextMusicReview">
              GitHub
            </Link>
          </HStack>
          <HStack spacing="3px">
            <Text>© {new Date().getFullYear()}, Built with </Text>
            <Link href="https://nextjs.org/">NextJS,</Link>
            <Link href="https://www.typescriptlang.org">Typescript,</Link>
            <Link href="https://www.algolia.com/">Algolia</Link>
            <Text>and</Text>
            <Link href="https://chakra-ui.com">Chakra-ui</Link>
          </HStack>
        </VStack>
      </Center>
    </footer>
  );
}
