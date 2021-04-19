import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ReviewsPage from "../../pages/reviews";
import TestWrapper from "../../tests/components/testWrapper";

function renderComponent() {
  return render(
    <TestWrapper>
      <ReviewsPage />
    </TestWrapper>
  );
}

describe("<ReviewsPage />", () => {
  test("should show reviews", async () => {
    const { findByText, findAllByText } = renderComponent();

    await waitFor(async () =>
      expect(await findByText("reviewText")).toBeInTheDocument()
    );

    expect(await findAllByText("albumName")).toHaveLength(1);
    expect(await findAllByText("performerName")).toHaveLength(1);
    expect(await findAllByText("reviewText")).toHaveLength(1);
  });

  test("should fetch more", async () => {
    const { findByText, findAllByText } = renderComponent();

    await waitFor(async () =>
      expect(await findByText("reviewText")).toBeInTheDocument()
    );
    expect(await findAllByText("reviewText")).toHaveLength(1);

    userEvent.click(await findByText("Fetch More"));

    await waitFor(async () =>
      expect(await findAllByText("reviewText")).toHaveLength(2)
    );

    expect(await findByText("Fetch More")).toBeDisabled();
  });
});
