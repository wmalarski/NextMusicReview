import {
  Avatar,
  Box,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import MenuText from "../../common/components/menuText";
import useMeQuery from "../queries/useMeQuery";

export default function UserHeader(): JSX.Element {
  const router = useRouter();

  const { data: meData } = useMeQuery();

  if (!meData) return <Link href="/api/login">Login</Link>;

  const { picture, name } = meData;

  return (
    <>
      <Box display={{ base: "none", md: "block" }}>
        <Menu>
          <MenuButton as={Avatar} size="sm" name={name} src={picture} />
          <MenuList>
            <MenuGroup title={name}>
              <MenuItem onClick={() => router.push("/profile")}>
                Profile
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="Session">
              <MenuItem onClick={() => router.push("/api/logout")}>
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <MenuText>
          <NextLink href="/profile">
            <Link>Profile</Link>
          </NextLink>
        </MenuText>
        <MenuText>
          <NextLink href="/api/logout">
            <Link>Logout</Link>
          </NextLink>
        </MenuText>
      </Box>
    </>
  );
}
