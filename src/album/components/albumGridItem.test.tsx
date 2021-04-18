import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { albumGridItemDefault } from "../../graphql/mocks/defaults";
import AlbumGridItem, { AlbumGridItemProps } from "./albumGridItem";

function renderAlbumGridItem(props: Partial<AlbumGridItemProps> = {}) {
  const defaultProps: AlbumGridItemProps = {
    imageHeight: "180px",
    setSelectedId: () => void 0,
    album: albumGridItemDefault
  };
  return render(<AlbumGridItem {...{ ...defaultProps, ...props }} />);
}

describe("<AlbumGridItem />", () => {
  test("required information displayed", async () => {
    const onClick = jest.fn();
    const { findByText } = renderAlbumGridItem({ setSelectedId: onClick });
    const albumComponent = await findByText("albumName");
    expect(albumComponent).toBeTruthy();

    const performerComponent = await findByText("performerName");
    expect(performerComponent).toBeTruthy();

    const yearComponent = await findByText("1999");
    expect(yearComponent).toBeTruthy();

    expect(onClick).toBeCalledTimes(0);
  });

  test("select album grid item", async () => {
    const onClick = jest.fn(reducer => {
      const result = reducer("otherId");
      expect(result).toEqual("aId");
    });
    const { findByText } = renderAlbumGridItem({ setSelectedId: onClick });
    const yearComponent = await findByText("1999");

    userEvent.click(yearComponent);

    expect(onClick).toBeCalledTimes(1);
  });

  test("deselect gird album", async () => {
    const onClick = jest.fn(reducer => {
      const result = reducer("aId");
      expect(result).toBeNull();
    });
    const { findByText } = renderAlbumGridItem({ setSelectedId: onClick });
    const yearComponent = await findByText("1999");

    userEvent.click(yearComponent);

    expect(onClick).toBeCalledTimes(1);
  });
});
