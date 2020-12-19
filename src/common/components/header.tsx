import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import MenuText from "./menuText";

export interface HeaderProps {
  leftAction?: React.ReactNode;
}

export default function Header(props: HeaderProps): JSX.Element {
  const { leftAction } = props;

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
        {leftAction}
        <a href="/api/login">Login</a>
        <a href="/api/logout">Logout</a>
        <Button bg="transparent" border="1px">
          Create account
        </Button>
      </Box>
    </Flex>
  );
}
