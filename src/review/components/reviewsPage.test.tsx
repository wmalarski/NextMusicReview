import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
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
  it("should show reviews", async () => {
    expect.hasAssertions();
    renderComponent();

    await waitFor(async () =>
      expect(await screen.findByText("reviewText")).toBeInTheDocument()
    );

    expect(await screen.findAllByText("albumName")).toHaveLength(1);
    expect(await screen.findAllByText("performerName")).toHaveLength(1);
    expect(await screen.findAllByText("reviewText")).toHaveLength(1);
  });

  it("should fetch more", async () => {
    expect.hasAssertions();
    renderComponent();

    await waitFor(async () =>
      expect(await screen.findByText("reviewText")).toBeInTheDocument()
    );
    expect(await screen.findAllByText("reviewText")).toHaveLength(1);

    userEvent.click(await screen.findByText("Fetch More"));

    await waitFor(async () =>
      expect(await screen.findAllByText("reviewText")).toHaveLength(2)
    );

    expect(await screen.findByText("Fetch More")).toBeDisabled();
  });
});
