import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
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
  it("should check query and visibility", async () => {
    expect.hasAssertions();
    renderComponent();

    await waitFor(async () =>
      expect(await screen.findByText("performerName")).toBeInTheDocument()
    );

    expect(await screen.findByText("Random")).toBeInTheDocument();
    expect(await screen.findByText("1999")).toBeInTheDocument();
  });

  it("should search box and query submit", async () => {
    expect.hasAssertions();
    renderComponent();

    await waitFor(async () =>
      expect(await screen.findByText("performerName")).toBeInTheDocument()
    );

    userEvent.type(await screen.findByRole("textbox"), "New album");
    userEvent.click(await screen.findByText("Submit"));

    await waitFor(async () =>
      expect(await screen.findByText("New album")).toBeInTheDocument()
    );
  });

  it("should fetch more", async () => {
    expect.hasAssertions();
    renderComponent();

    await waitFor(async () =>
      expect(await screen.findByText("performerName")).toBeInTheDocument()
    );
    expect(await screen.findAllByText("performerName")).toHaveLength(1);

    userEvent.click(await screen.findByText("Fetch More"));

    await waitFor(async () =>
      expect(await screen.findAllByText("performerName")).toHaveLength(2)
    );

    expect(await screen.findByText("Fetch More")).toBeDisabled();
  });
});
