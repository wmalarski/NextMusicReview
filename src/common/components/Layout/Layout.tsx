import { Center, Container, Divider, Stack } from "@chakra-ui/react";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export interface LayoutProps {
  children: React.ReactChild;
  container?: boolean;
}

export default function Layout(props: LayoutProps): JSX.Element {
  const { children, container } = props;

  return (
    <Stack spacing="30px">
      <Header />
      <Center>
        {container ? (
          <Container maxWidth="6xl">{children}</Container>
        ) : (
          children
        )}
      </Center>
      <Divider />
      <Footer />
    </Stack>
  );
}
