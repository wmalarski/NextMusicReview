import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../../tests/components/TestWrapper";
import { albumGridItemDefault } from "../../../tests/defaults";
import AlbumActionsBar, { AlbumActionsBarProps } from "./AlbumActionsBar";

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

jest.mock("@chakra-ui/media-query", () => ({
  useMediaQuery: jest.fn().mockReturnValue([false])
}));

describe("<AlbumActionsBar />", () => {
  const globalMock = jest.spyOn(global, "open").mockImplementation();
  const { useMediaQuery } = jest.requireMock("@chakra-ui/media-query");

  afterEach(() => {
    globalMock.mockClear();
    useMediaQuery.mockClear();
  });

  it("should display required information", async () => {
    expect.hasAssertions();
    useMediaQuery.mockReturnValueOnce([true]);
    renderComponent();

    expect((await screen.findAllByText("Delete")).length).toBeGreaterThan(0);
    expect((await screen.findAllByText("Review")).length).toBeGreaterThan(0);
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
