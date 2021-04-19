import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import { albumGridItemDefault } from "../../tests/defaults";
import AlbumActionsBar, { AlbumActionsBarProps } from "./albumActionsBar";

jest.mock("@chakra-ui/media-query", () => ({
  // TODO: fix this
  useMediaQuery: jest.fn().mockReturnValueOnce([true]).mockReturnValue([false])
}));

function renderComponent(props: Partial<AlbumActionsBarProps> = {}) {
  const defaultProps: AlbumActionsBarProps = {
    album: albumGridItemDefault
  };
  return render(
    <TestWrapper>
      <AlbumActionsBar {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<AlbumActionsBar />", () => {
  test("should display required information", async () => {
    renderComponent();
  });

  test("should display required information", async () => {
    renderComponent();
  });

  test("should display nothing", async () => {
    renderComponent({ album: undefined });
  });

  test("should create link without performer", async () => {
    renderComponent({
      album: {
        ...albumGridItemDefault,
        performer: undefined
      }
    });
  });

  test("should try to open new page", async () => {
    global.open = jest.fn();
    const { findByText } = renderComponent();

    userEvent.click(await findByText("YouTube"));
    expect(global.open).toBeCalled();
  });
});
