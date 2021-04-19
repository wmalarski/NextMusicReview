import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
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
  test("should show wiki, albums and reviews", async () => {
    const { findByText } = renderComponent();

    await waitFor(async () =>
      expect(await findByText("Album0")).toBeInTheDocument()
    );

    userEvent.click(await findByText("Reload"));

    await waitFor(async () =>
      expect(await findByText("Album1")).toBeInTheDocument()
    );
  });
});
