import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../../tests/components/TestWrapper";
import { albumGridItemDefault } from "../../../tests/defaults";
import AlbumEditAccordion, {
  AlbumEditAccordionProps
} from "./AlbumEditAccordion";

function renderComponent(props: Partial<AlbumEditAccordionProps> = {}) {
  const defaultProps: AlbumEditAccordionProps = {
    album: albumGridItemDefault
  };
  return render(
    <TestWrapper>
      <AlbumEditAccordion {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<AlbumEditAccordion />", () => {
  it("should open and close", async () => {
    expect.hasAssertions();
    renderComponent();

    userEvent.click(await screen.findByText("Edit"));
    expect(await screen.findByText("Name")).toBeInTheDocument();
    expect(await screen.findByText("Year")).toBeInTheDocument();
    userEvent.click(await screen.findByText("Edit"));
  });
});
