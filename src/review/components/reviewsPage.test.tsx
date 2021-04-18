import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "../../graphql/queryClient";
import ReviewsPage from "../../pages/reviews";
import server from "../mocks/server";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

function renderReviewsPage() {
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <ReviewsPage />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

describe("<ReviewsPage />", () => {
  test("shows reviews", async () => {
    const { findByText, findAllByText } = renderReviewsPage();

    await waitFor(async () =>
      expect(await findByText("reviewText")).toBeInTheDocument()
    );

    expect(await findAllByText("albumName")).toHaveLength(1);
    expect(await findAllByText("performerName")).toHaveLength(1);
    expect(await findAllByText("reviewText")).toHaveLength(1);
  });

  test("fetch more", async () => {
    const { findByText, findAllByText } = renderReviewsPage();

    await waitFor(async () =>
      expect(await findByText("reviewText")).toBeInTheDocument()
    );
    expect(await findAllByText("reviewText")).toHaveLength(1);

    userEvent.click(await findByText("Fetch More"));

    await waitFor(async () =>
      expect(await findAllByText("reviewText")).toHaveLength(2)
    );

    expect(await findByText("Fetch More")).toBeDisabled();
  });
});
