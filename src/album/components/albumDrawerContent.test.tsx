import { Drawer } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
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
  test("should update data with wiki content", async () => {
    const { findByText } = renderComponent();

    expect(await findByText("albumName")).toBeInTheDocument();
    expect(await findByText("1999")).toBeInTheDocument();
    expect(await findByText("performerName")).toBeInTheDocument();

    await waitFor(async () =>
      expect(await findByText("content")).toBeInTheDocument()
    );

    expect(await findByText("summary")).toBeInTheDocument();
  });

  test("should update data with wiki content", async () => {
    const { findByText } = renderComponent({
      album: {
        ...albumGridItemDefault,
        year: 0,
        performer: undefined,
        details: undefined
      }
    });

    expect(await findByText("albumName")).toBeInTheDocument();
  });
});
