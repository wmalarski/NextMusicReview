import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import { albumGridItemDefault } from "../../tests/defaults";
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

afterEach(() => push.mockClear());

function renderComponent(props: Partial<AlbumDeleteButtonProps> = {}) {
  const defaultProps: AlbumDeleteButtonProps = { album: albumGridItemDefault };
  return render(
    <TestWrapper>
      <AlbumDeleteButton {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<AlbumDeleteButton />", () => {
  test("should succeed", async () => {
    sessionStorage.setItem("authorization", "barer ey0");

    const { findByText } = renderComponent();

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
