import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import UserHeader from "../../users/components/userHeader";
import MenuText from "./menuText";
import ThemeSwitch from "./themeSwitch";

export default function Header(): JSX.Element {
  const [show, setShow] = React.useState(false);

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        shadow="lg"
      >
        <Box mr="5">
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"} variant="primary">
            <NextLink href="/">Next Music Review</NextLink>
          </Heading>
        </Box>

        <Box
          display={{ base: "block", md: "none" }}
          onClick={() => setShow(prev => !prev)}
        >
          <HamburgerIcon />
        </Box>

        <Box
          display={{ base: show ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          flexGrow={1}
        >
          <Box
            display={{ base: "column", md: "flex" }}
            flexGrow={1}
            alignItems="center"
          >
            <MenuText>
              <NextLink href="/reviews">
                <Link>Reviews</Link>
              </NextLink>
            </MenuText>
            {/* <MenuText>
            <NextLink href="/search">
              <Link>Search</Link>
            </NextLink>
          </MenuText> */}
            <MenuText>
              <NextLink href="/search2">
                <Link>Search</Link>
              </NextLink>
            </MenuText>
          </Box>
          <Box mr="3">
            <ThemeSwitch />
          </Box>
          <UserHeader />
        </Box>
      </Flex>
      <Divider height="1px" />
    </Box>
  );
}
