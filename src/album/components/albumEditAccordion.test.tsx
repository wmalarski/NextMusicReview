import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { albumGridItemDefault } from "../../graphql/mocks/defaults";
import TestWrapper from "../../tests/components/testWrapper";
import AlbumEditAccordion, {
  AlbumEditAccordionProps
} from "./albumEditAccordion";

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
  test("should open and close", async () => {
    const { findByText } = renderComponent();

    userEvent.click(await findByText("Edit"));
    expect(await findByText("Name")).toBeInTheDocument();
    expect(await findByText("Year")).toBeInTheDocument();
    userEvent.click(await findByText("Edit"));
  });
});
