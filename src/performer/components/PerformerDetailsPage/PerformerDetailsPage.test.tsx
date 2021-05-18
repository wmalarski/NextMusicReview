import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import PerformerDetailsPage, {
  PerformerDetailsPageProps
} from "../../../pages/performers/[id]";
import TestWrapper from "../../../tests/components/TestWrapper";

function renderComponent(props: Partial<PerformerDetailsPageProps> = {}) {
  const defaultProps: PerformerDetailsPageProps = { id: "pId" };
  return render(
    <TestWrapper>
      <PerformerDetailsPage {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<PerformerDetailsPage />", () => {
  it("should show wiki, albums and reviews", async () => {
    expect.hasAssertions();
    renderComponent();

    await waitFor(async () =>
      expect(await screen.findByText("content")).toBeInTheDocument()
    );

    expect(await screen.findByText("content")).toBeInTheDocument();
    expect(await screen.findByText("summary")).toBeInTheDocument();
    expect(await screen.findAllByText("albumName")).toHaveLength(4); // reviews + albums
    expect(await screen.findAllByText("reviewText")).toHaveLength(2);
  });
});
