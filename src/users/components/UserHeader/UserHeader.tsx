import { useUser } from "@auth0/nextjs-auth0";
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
import MenuText from "../../../common/components/MenuText/MenuText";
import { LoginPagePathKey } from "../../types";

export default function UserHeader(): JSX.Element | null {
  const router = useRouter();

  const { user, error, isLoading } = useUser();

  if (isLoading) return null;
  if (error) return <div>{error.message}</div>;

  if (!user)
    return (
      <Link
        onClick={() => {
          localStorage.setItem(LoginPagePathKey, router.asPath);
          router.push("/api/auth/login");
        }}
      >
        Login
      </Link>
    );

  const { picture, name, nickname } = user;
  const userName = name ?? nickname ?? "Anon";

  return (
    <>
      <Box display={{ base: "none", md: "block" }}>
        <Menu>
          <MenuButton as={Avatar} size="sm" name={userName} src={picture} />
          <MenuList>
            <MenuGroup title={userName}>
              <MenuItem onClick={() => router.push("/profile")}>
                Profile
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="Session">
              <MenuItem
                onClick={() => {
                  localStorage.setItem(LoginPagePathKey, router.asPath);
                  router.push("/api/auth/logout");
                }}
              >
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
          <NextLink href="/api/auth/logout">
            <Link>Logout</Link>
          </NextLink>
        </MenuText>
      </Box>
    </>
  );
}
