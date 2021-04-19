import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "../../graphql/queryClient";

export default function TestWrapper(props: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ChakraProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </UserProvider>
    </ChakraProvider>
  );
}
