import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  useColorMode
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import UserHeader from "../../users/components/userHeader";
import MenuText from "./menuText";

export default function Header(): JSX.Element {
  const [show, setShow] = React.useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"} variant="primary">
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
          <Button onClick={toggleColorMode} size="sm">
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </Box>

        <Stack
          display={{ base: show ? "flex" : "none", md: "block" }}
          direction={{ base: "column", md: "row" }}
        >
          <Link href="https://www.linkedin.com/in/wojciech-malarski-4a1473168/">
            LinkedIn
          </Link>
          <Link href="https://github.com/wmalarski/NextMusicReview">
            GitHub
          </Link>
          <UserHeader />
        </Stack>
      </Flex>
      <Divider height="1px" />
    </Box>
  );
}
