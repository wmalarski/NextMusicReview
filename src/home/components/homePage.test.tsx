import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import HomePage from "../../pages";
import TestWrapper from "../../tests/components/testWrapper";

function renderComponent() {
  return render(
    <TestWrapper>
      <HomePage />
    </TestWrapper>
  );
}

describe("<HomePage />", () => {
  it("should show wiki, albums and reviews", async () => {
    expect.hasAssertions();
    renderComponent();

    await waitFor(async () =>
      expect(await screen.findByText("Album0")).toBeInTheDocument()
    );

    userEvent.click(await screen.findByText("Reload"));

    await waitFor(async () =>
      expect(await screen.findByText("Album1")).toBeInTheDocument()
    );
  });
});
