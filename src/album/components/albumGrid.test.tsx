import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { albumGridItemDefault } from "../../graphql/mocks/defaults";
import TestWrapper from "../../tests/components/testWrapper";
import AlbumGrid, { AlbumGridProps } from "./albumGrid";

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
  test("should display all information", async () => {
    const { findByText, findAllByText } = renderComponent();

    expect(await findByText("Album1")).toBeInTheDocument();
    expect(await findByText("Album2")).toBeInTheDocument();
    expect(await findAllByText("performerName")).toHaveLength(2);
  });

  test("should display drawer after selection", async () => {
    const { findByText, findByTestId } = renderComponent();

    userEvent.click(await findByTestId("album-grid-item-album1"));
    expect(await findByText("content")).toBeInTheDocument();
    userEvent.click(await findByText("Cancel"));
  });

  test("should display drawer after selection", async () => {
    const { findByTestId, findByText } = renderComponent();

    userEvent.click(await findByTestId("album-grid-item-album1"));
    expect(await findByText("content")).toBeInTheDocument();
    userEvent.click(await findByTestId("drawer-close-button"));
  });
});
