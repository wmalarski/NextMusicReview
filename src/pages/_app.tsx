import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps /*, AppContext */ } from "next/app";
import Head from "next/head";
import React from "react";

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
      </Head>
      <ChakraProvider>
        <div>
          <Component {...pageProps} />
        </div>
      </ChakraProvider>
    </React.Fragment>
  );
}
