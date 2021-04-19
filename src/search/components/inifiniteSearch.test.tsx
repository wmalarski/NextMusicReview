import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import InfiniteSearch from "../../pages/search2";
import TestWrapper from "../../tests/components/testWrapper";

function renderComponent() {
  return render(
    <TestWrapper>
      <InfiniteSearch />
    </TestWrapper>
  );
}

describe("<InfiniteSearch />", () => {
  test("should check query and visibility", async () => {
    const { findByText } = renderComponent();

    await waitFor(async () =>
      expect(await findByText("performerName")).toBeInTheDocument()
    );

    expect(await findByText("Random")).toBeInTheDocument();
    expect(await findByText("1999")).toBeInTheDocument();
  });

  test("should search box and query submit", async () => {
    const { findByText, findByRole } = renderComponent();

    await waitFor(async () =>
      expect(await findByText("performerName")).toBeInTheDocument()
    );

    userEvent.type(await findByRole("textbox"), "New album");
    userEvent.click(await findByText("Submit"));

    await waitFor(async () =>
      expect(await findByText("New album")).toBeInTheDocument()
    );
  });

  test("should fetch more", async () => {
    const { findByText, findAllByText } = renderComponent();

    await waitFor(async () =>
      expect(await findByText("performerName")).toBeInTheDocument()
    );
    expect(await findAllByText("performerName")).toHaveLength(1);

    userEvent.click(await findByText("Fetch More"));

    await waitFor(async () =>
      expect(await findAllByText("performerName")).toHaveLength(2)
    );

    expect(await findByText("Fetch More")).toBeDisabled();
  });
});
