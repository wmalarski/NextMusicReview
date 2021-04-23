import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import SearchPage from "../../pages/search";
import TestWrapper from "../../tests/components/testWrapper";

function renderComponent() {
  return render(
    <TestWrapper>
      <SearchPage />
    </TestWrapper>
  );
}

describe("<SearchPage />", () => {
  it("should be visible", async () => {
    expect.hasAssertions();
    renderComponent();
    expect(await screen.findByText("Algolia Search")).toBeInTheDocument();
  });
});
