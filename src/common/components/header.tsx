import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import MenuText from "./menuText";

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
export default function Header(): JSX.Element {
  const [show, setShow] = React.useState(false);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
          Next Music Review
        </Heading>
      </Flex>

      <Box
        display={{ base: "block", md: "none" }}
        onClick={() => setShow(prev => !prev)}
      >
        <HamburgerIcon />
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuText>Docs</MenuText>
        <MenuText>Examples</MenuText>
        <MenuText>Blog</MenuText>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Create account
        </Button>
      </Box>
    </Flex>
  );
}
