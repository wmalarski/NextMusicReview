import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import { albumGridItemDefault } from "../../tests/defaults";
import AlbumDeleteButton, { AlbumDeleteButtonProps } from "./albumDeleteButton";

function renderComponent(props: Partial<AlbumDeleteButtonProps> = {}) {
  const defaultProps: AlbumDeleteButtonProps = { album: albumGridItemDefault };
  return render(
    <TestWrapper>
      <AlbumDeleteButton {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

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

describe("<AlbumDeleteButton />", () => {
  afterEach(() => push.mockClear());

  it("should succeed", async () => {
    expect.hasAssertions();
    sessionStorage.setItem("authorization", "barer ey0");

    renderComponent();

    userEvent.click(await screen.findByText("Delete"));

    await waitFor(async () =>
      expect(push).toHaveBeenCalledWith("/performers/pId")
    );
  });

  it.skip("should show authorization error", async () => {
    expect.hasAssertions();
    renderComponent();

    userEvent.click(await screen.findByText("Delete"));

    // expect(await screen.findByText("Error")).toBeInTheDocument();

    await waitFor(async () =>
      expect(await screen.findByText("Cannot remove album")).toBeInTheDocument()
    );
  });
});
