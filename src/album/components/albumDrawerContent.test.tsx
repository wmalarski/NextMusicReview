import { Drawer } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import { albumGridItemDefault } from "../../tests/defaults";
import AlbumDrawerContent, {
  AlbumDrawerContentProps
} from "./albumDrawerContent";

function renderComponent(props: Partial<AlbumDrawerContentProps> = {}) {
  const defaultProps: AlbumDrawerContentProps = {
    album: albumGridItemDefault
  };
  return render(
    <TestWrapper>
      <Drawer isOpen onClose={() => void 0}>
        <AlbumDrawerContent {...{ ...defaultProps, ...props }} />
      </Drawer>
    </TestWrapper>
  );
}

describe("<AlbumDrawerContent />", () => {
  it("should update data with wiki content", async () => {
    expect.hasAssertions();
    renderComponent();

    expect(await screen.findByText("albumName")).toBeInTheDocument();
    expect(await screen.findByText("1999")).toBeInTheDocument();
    expect(await screen.findByText("performerName")).toBeInTheDocument();

    await waitFor(async () =>
      expect(await screen.findByText("content")).toBeInTheDocument()
    );

    expect(await screen.findByText("summary")).toBeInTheDocument();
  });

  it("should update show simplified content", async () => {
    expect.hasAssertions();
    renderComponent({
      album: {
        ...albumGridItemDefault,
        year: 0,
        performer: undefined,
        details: undefined
      }
    });

    expect(await screen.findByText("albumName")).toBeInTheDocument();
  });
});
