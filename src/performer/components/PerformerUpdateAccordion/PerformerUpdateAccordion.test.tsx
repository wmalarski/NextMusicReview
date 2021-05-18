import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../../tests/components/TestWrapper";
import PerformerUpdateAccordion, {
  PerformerUpdateAccordionProps
} from "./PerformerUpdateAccordion";

function renderComponent(props: Partial<PerformerUpdateAccordionProps> = {}) {
  const defaultProps: PerformerUpdateAccordionProps = {
    performer: { id: "pId", name: "PerformerName" }
  };
  return render(
    <TestWrapper>
      <PerformerUpdateAccordion {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<PerformerUpdateAccordion />", () => {
  it("should open and close", async () => {
    expect.hasAssertions();
    renderComponent();

    userEvent.click(await screen.findByText("Edit"));
    expect(await screen.findByText("Name")).toBeInTheDocument();
    userEvent.click(await screen.findByText("Edit"));
  });
});
