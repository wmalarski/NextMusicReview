import { UserProvider } from "@auth0/nextjs-auth0";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import server from "../../graphql/mocks/mockServer";
import queryClient from "../../graphql/queryClient";
import InfiniteSearch from "../../pages/search2";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

function renderInfiniteSearch() {
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <InfiniteSearch />
      </UserProvider>
    </QueryClientProvider>
  );
}

describe("<InfiniteSearch />", () => {
  test("check query and visibility", async () => {
    const { findByText } = renderInfiniteSearch();

    await waitFor(async () =>
      expect(await findByText("performerName")).toBeInTheDocument()
    );

    expect(await findByText("Random")).toBeInTheDocument();
    expect(await findByText("1999")).toBeInTheDocument();
  });

  test("search box and query submit", async () => {
    const { findByText, findByRole } = renderInfiniteSearch();

    await waitFor(async () =>
      expect(await findByText("performerName")).toBeInTheDocument()
    );

    userEvent.type(await findByRole("textbox"), "New album");
    userEvent.click(await findByText("Submit"));

    await waitFor(async () =>
      expect(await findByText("New album")).toBeInTheDocument()
    );
  });

  test("fetch more", async () => {
    const { findByText, findAllByText } = renderInfiniteSearch();

    await waitFor(async () =>
      expect(await findByText("performerName")).toBeInTheDocument()
    );
    expect(await findAllByText("performerName")).toHaveLength(1);

    userEvent.click(await findByText("Fetch More"));

    await waitFor(async () =>
      expect(await findAllByText("performerName")).toHaveLength(2)
    );

    expect(await findByText("Fetch More")).toBeDisabled();
  });
});
