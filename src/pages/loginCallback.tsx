import { Center } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../common/components/layout";
import { LoginPagePathKey } from "../users/types";

export default function HomePage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const loginPath = localStorage.getItem(LoginPagePathKey);
    localStorage.removeItem(LoginPagePathKey);
    router.push(loginPath ?? "/");
  });

  return (
    <Layout container>
      <Center>Login Successful</Center>
    </Layout>
  );
}
