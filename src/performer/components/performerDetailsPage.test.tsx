import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import PerformerDetailsPage, {
  PerformerDetailsPageProps
} from "../../pages/performers/[id]";
import TestWrapper from "../../tests/components/testWrapper";

function renderComponent(props: Partial<PerformerDetailsPageProps> = {}) {
  const defaultProps: PerformerDetailsPageProps = { id: "pId" };
  return render(
    <TestWrapper>
      <PerformerDetailsPage {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<PerformerDetailsPage />", () => {
  test("should show wiki, albums and reviews", async () => {
    const { findByText, findAllByText } = renderComponent();

    await waitFor(async () =>
      expect(await findByText("content")).toBeInTheDocument()
    );

    expect(await findByText("content")).toBeInTheDocument();
    expect(await findByText("summary")).toBeInTheDocument();
    expect(await findAllByText("albumName")).toHaveLength(4); // reviews + albums
    expect(await findAllByText("reviewText")).toHaveLength(2);
  });
});
