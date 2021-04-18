import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "../../graphql/queryClient";
import PerformerDetailsPage, {
  PerformerDetailsPageProps
} from "../../pages/performers/[id]";
import server from "../mocks/server";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

function renderPerformerDetailsPage(
  props: Partial<PerformerDetailsPageProps> = {}
) {
  const defaultProps: PerformerDetailsPageProps = { id: "pId" };
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <PerformerDetailsPage {...{ ...defaultProps, ...props }} />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

describe("<PerformerDetailsPage />", () => {
  test("shows wiki, albums and reviews", async () => {
    const { findByText, findAllByText } = renderPerformerDetailsPage();

    await waitFor(async () =>
      expect(await findByText("content")).toBeInTheDocument()
    );

    expect(await findByText("content")).toBeInTheDocument();
    expect(await findByText("summary")).toBeInTheDocument();
    expect(await findAllByText("albumName")).toHaveLength(4); // reviews + albums
    expect(await findAllByText("reviewText")).toHaveLength(2);
  });
});
