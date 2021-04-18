import { UserProvider } from "@auth0/nextjs-auth0";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import SearchPage from "../../pages/search";

function renderInfiniteSearch() {
  return render(
    <UserProvider>
      <SearchPage />
    </UserProvider>
  );
}

describe("<SearchPage />", () => {
  test("should be visible", async () => {
    const { findByText } = renderInfiniteSearch();
    expect(await findByText("Algolia Search")).toBeInTheDocument();
  });
});
