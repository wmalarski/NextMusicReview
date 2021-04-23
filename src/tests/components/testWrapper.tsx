import { UserProvider, UserProviderProps } from "@auth0/nextjs-auth0";
import { ChakraProvider, ChakraProviderProps } from "@chakra-ui/react";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps
} from "react-query";

export interface TestWrapperProps {
  children: React.ReactNode;
  chakraProps?: ChakraProviderProps;
  userProps?: UserProviderProps;
  queryProps?: QueryClientProviderProps;
}

export default function TestWrapper(props: TestWrapperProps): JSX.Element {
  const { chakraProps, userProps, children, queryProps } = props;
  const queryClient = new QueryClient();
  return (
    <ChakraProvider {...chakraProps}>
      <UserProvider {...userProps}>
        <QueryClientProvider client={queryClient} {...queryProps}>
          {children}
        </QueryClientProvider>
      </UserProvider>
    </ChakraProvider>
  );
}
