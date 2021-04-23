import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import { albumGridItemDefault } from "../../tests/defaults";
import ReviewEditAccordion, {
  ReviewEditAccordionProps
} from "./reviewEditAccordion";

function renderComponent(props: Partial<ReviewEditAccordionProps> = {}) {
  const defaultProps: ReviewEditAccordionProps = {
    album: albumGridItemDefault
  };
  return render(
    <TestWrapper>
      <ReviewEditAccordion {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<ReviewEditAccordion />", () => {
  it("should open and close", async () => {
    expect.hasAssertions();
    renderComponent();

    userEvent.click(await screen.findByRole("button", { name: "Review" }));
    expect(await screen.findByText("Save")).toBeInTheDocument();
    userEvent.click(await screen.findByRole("button", { name: "Review" }));
  });
});
