import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { albumGridItemDefault } from "../../graphql/mocks/defaults";
import TestWrapper from "../../tests/components/testWrapper";
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
  test("should display required information", async () => {
    const onClick = jest.fn();
    const { findByText } = renderComponent({ setSelectedId: onClick });
    const albumComponent = await findByText("albumName");
    expect(albumComponent).toBeTruthy();

    const performerComponent = await findByText("performerName");
    expect(performerComponent).toBeTruthy();

    const yearComponent = await findByText("1999");
    expect(yearComponent).toBeTruthy();

    expect(onClick).toBeCalledTimes(0);
  });

  test("should select album grid item", async () => {
    const onClick = jest.fn(reducer => {
      const result = reducer("otherId");
      expect(result).toEqual("aId");
    });
    const { findByText } = renderComponent({ setSelectedId: onClick });
    const yearComponent = await findByText("1999");

    userEvent.click(yearComponent);

    expect(onClick).toBeCalledTimes(1);
  });

  test("should deselect gird album", async () => {
    const onClick = jest.fn(reducer => {
      const result = reducer("aId");
      expect(result).toBeNull();
    });
    const { findByText } = renderComponent({ setSelectedId: onClick });
    const yearComponent = await findByText("1999");

    userEvent.click(yearComponent);

    expect(onClick).toBeCalledTimes(1);
  });
});
