import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import UserHeader from "../../users/components/userHeader";
import MenuText from "./menuText";

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
            <NextLink href="/reviews">
              <Link>Reviews</Link>
            </NextLink>
          </MenuText>
        </Box>

        <Box
          display={{ base: show ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <HStack>
            <Link href="https://www.linkedin.com/in/wojciech-malarski-4a1473168/">
              LinkedIn
            </Link>
            <Link href="https://github.com/wmalarski/NextMusicReview">
              GitHub
            </Link>
            <UserHeader />
          </HStack>
        </Box>
      </Flex>
      <Divider height="1px" />
    </Box>
  );
}
