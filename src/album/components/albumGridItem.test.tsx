import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import { albumGridItemDefault } from "../../tests/defaults";
import AlbumGridItem, { AlbumGridItemProps } from "./albumGridItem";

function renderComponent(props: Partial<AlbumGridItemProps> = {}) {
  const defaultProps: AlbumGridItemProps = {
    imageHeight: "180px",
    setSelectedId: () => void 0,
    album: albumGridItemDefault
  };
  return render(
    <TestWrapper>
      <AlbumGridItem {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<AlbumGridItem />", () => {
  it("should display required information", async () => {
    expect.hasAssertions();
    const onClick = jest.fn();
    renderComponent({ setSelectedId: onClick });
    const albumComponent = await screen.findByText("albumName");
    expect(albumComponent).toBeTruthy();

    const performerComponent = await screen.findByText("performerName");
    expect(performerComponent).toBeTruthy();

    const yearComponent = await screen.findByText("1999");
    expect(yearComponent).toBeTruthy();

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it("should select album grid item", async () => {
    expect.hasAssertions();
    const onClick = jest.fn(reducer => {
      const result = reducer("otherId");
      expect(result).toStrictEqual("aId");
    });
    renderComponent({ setSelectedId: onClick });
    const yearComponent = await screen.findByText("1999");

    userEvent.click(yearComponent);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should deselect gird album", async () => {
    expect.hasAssertions();
    const onClick = jest.fn(reducer => {
      const result = reducer("aId");
      expect(result).toBeNull();
    });
    renderComponent({ setSelectedId: onClick });
    const yearComponent = await screen.findByText("1999");

    userEvent.click(yearComponent);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
