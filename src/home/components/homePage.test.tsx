import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import server from "../../graphql/mocks/mockServer";
import queryClient from "../../graphql/queryClient";
import HomePage from "../../pages";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  sessionStorage.clear();
  queryClient.clear();
});
afterAll(() => server.close());

function renderHomePage() {
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <HomePage />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

describe("<HomePage />", () => {
  test("shows wiki, albums and reviews", async () => {
    const { findByText } = renderHomePage();

    await waitFor(async () =>
      expect(await findByText("Album0")).toBeInTheDocument()
    );

    userEvent.click(await findByText("Reload"));

    await waitFor(async () =>
      expect(await findByText("Album1")).toBeInTheDocument()
    );
  });
});
