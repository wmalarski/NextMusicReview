import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import { albumGridItemDefault } from "../../tests/defaults";
import AlbumActionsBar, { AlbumActionsBarProps } from "./albumActionsBar";

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
  const globalMock = jest.spyOn(global, "open").mockImplementation();
  afterEach(() => globalMock.mockClear());

  jest.mock("@chakra-ui/media-query", () => ({
    // TODO: fix this
    useMediaQuery: jest
      .fn()
      .mockReturnValueOnce([true])
      .mockReturnValue([false])
  }));

  it("should display required information", async () => {
    expect.hasAssertions();
    renderComponent();

    expect(await screen.findByText("Delete")).toBeInTheDocument();
    expect(await screen.findByText("Review")).toBeInTheDocument();
    expect(await screen.findByText("YouTube")).toBeInTheDocument();
  });

  it("should display nothing", async () => {
    expect.hasAssertions();
    renderComponent({ album: undefined });

    expect(screen.queryByText("Delete")).toBeNull();
    expect(screen.queryByText("Review")).toBeNull();
    expect(screen.queryByText("YouTube")).toBeNull();
  });

  it("should create link without performer", async () => {
    expect.hasAssertions();

    renderComponent({
      album: {
        ...albumGridItemDefault,
        performer: undefined
      }
    });

    userEvent.click(await screen.findByText("YouTube"));
    expect(global.open).toHaveBeenCalledTimes(1);
  });

  it("should try to open new page", async () => {
    expect.hasAssertions();

    renderComponent();

    userEvent.click(await screen.findByText("YouTube"));
    expect(global.open).toHaveBeenCalledTimes(1);
  });
});
