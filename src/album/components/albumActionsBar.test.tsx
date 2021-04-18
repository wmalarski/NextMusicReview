import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import { albumGridItemDefault } from "../../graphql/mocks/defaults";
import queryClient from "../../graphql/queryClient";
import AlbumActionsBar, { AlbumActionsBarProps } from "./albumActionsBar";

jest.mock("@chakra-ui/media-query", () => ({
  useMediaQuery: jest.fn().mockReturnValueOnce([true]).mockReturnValue([false])
}));

function renderAlbumActionsBar(props: Partial<AlbumActionsBarProps> = {}) {
  const defaultProps: AlbumActionsBarProps = {
    album: albumGridItemDefault
  };
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AlbumActionsBar {...{ ...defaultProps, ...props }} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

describe("<AlbumActionsBar />", () => {
  test("required information displayed", async () => {
    renderAlbumActionsBar();
  });

  test("required information displayed", async () => {
    renderAlbumActionsBar();
  });

  test("should display nothing", async () => {
    renderAlbumActionsBar({ album: undefined });
  });

  test("should try to open new page", async () => {
    global.open = jest.fn();
    const { findByText } = renderAlbumActionsBar();

    userEvent.click(await findByText("YouTube"));
    expect(global.open).toBeCalled();
  });
});
