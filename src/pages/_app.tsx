import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps /*, AppContext */ } from "next/app";
import Head from "next/head";
import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "../graphql/queryClient";

export default function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <title>Next Music Review</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
          integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8="
          crossOrigin="anonymous"
        />
      </Head>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </React.Fragment>
  );
}
