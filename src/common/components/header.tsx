import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import UserHeader from "../../users/components/userHeader";
import MenuText from "./menuText";

export default function Header(): JSX.Element {
  const [show, setShow] = React.useState(false);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.200"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
          <NextLink href="/">Next Music Review</NextLink>
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
        <MenuText>
          <NextLink href="/performers">
            <Link>Performers</Link>
          </NextLink>
        </MenuText>
        <MenuText>
          <NextLink href="/albums">
            <Link>Albums</Link>
          </NextLink>
        </MenuText>
        <MenuText>
          <NextLink href="/reviews">
            <Link>Reviews</Link>
          </NextLink>
        </MenuText>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <UserHeader />
      </Box>
    </Flex>
  );
}
