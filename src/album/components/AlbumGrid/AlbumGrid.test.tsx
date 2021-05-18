import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../../tests/components/TestWrapper";
import { albumGridItemDefault } from "../../../tests/defaults";
import AlbumGrid, { AlbumGridProps } from "./AlbumGrid";

function renderComponent(props: Partial<AlbumGridProps> = {}) {
  const defaultProps: AlbumGridProps = {
    isLoading: false,
    defaultCount: 5,
    albums: [
      { ...albumGridItemDefault, id: "album1", name: "Album1" },
      { ...albumGridItemDefault, id: "album2", name: "Album2" }
    ]
  };
  return render(
    <TestWrapper>
      <AlbumGrid {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<AlbumGrid />", () => {
  it("should display all information", async () => {
    expect.hasAssertions();
    renderComponent();

    expect(await screen.findByText("Album1")).toBeInTheDocument();
    expect(await screen.findByText("Album2")).toBeInTheDocument();
    expect(await screen.findAllByText("performerName")).toHaveLength(2);
  });

  it.skip("should display drawer after selection", async () => {
    expect.hasAssertions();
    renderComponent();

    userEvent.click(await screen.findByTestId("album-grid-item-album1"));
    expect(await screen.findByText("content")).toBeInTheDocument();
    userEvent.click(await screen.findByText("Cancel"));
  });

  it.skip("should display drawer after selection and close after button click", async () => {
    expect.hasAssertions();
    renderComponent();

    userEvent.click(await screen.findByTestId("album-grid-item-album1"));
    expect(await screen.findByText("content")).toBeInTheDocument();
    userEvent.click(await screen.findByTestId("drawer-close-button"));
  });
});
