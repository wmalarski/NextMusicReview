import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import { albumGridItemDefault } from "../../graphql/mocks/defaults";
import server from "../../graphql/mocks/mockServer";
import queryClient from "../../graphql/queryClient";
import AlbumDeleteButton, { AlbumDeleteButtonProps } from "./albumDeleteButton";

const push = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push
    };
  }
}));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
  push.mockClear();
});
afterAll(() => server.close());

function renderAlbumDeleteButton(props: Partial<AlbumDeleteButtonProps> = {}) {
  const defaultProps: AlbumDeleteButtonProps = { album: albumGridItemDefault };
  return render(
    <QueryClientProvider client={queryClient}>
      <AlbumDeleteButton {...{ ...defaultProps, ...props }} />
    </QueryClientProvider>
  );
}

describe("<AlbumDeleteButton />", () => {
  test("should succeed", async () => {
    sessionStorage.setItem("authorization", "barer ey0");

    const { findByText } = renderAlbumDeleteButton();

    userEvent.click(await findByText("Delete"));

    await waitFor(async () => expect(push).toBeCalledWith("/performers/pId"));
  });

  // test("should show authorization error", async () => {
  //   const { findByText } = renderAlbumDeleteButton();

  //   userEvent.click(await findByText("Delete"));

  //   // expect(await findByText("Error")).toBeInTheDocument();

  //   await waitFor(async () =>
  //     expect(await findByText("Cannot remove album")).toBeInTheDocument()
  //   );
  // });
});
