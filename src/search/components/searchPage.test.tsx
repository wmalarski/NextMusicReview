import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
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
  test("should be visible", async () => {
    const { findByText } = renderComponent();
    expect(await findByText("Algolia Search")).toBeInTheDocument();
  });
});
