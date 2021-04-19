import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import AlbumDetailsPage, {
  AlbumDetailsPageProps
} from "../../pages/albums/[id]";
import TestWrapper from "../../tests/components/testWrapper";

function renderComponent(props: Partial<AlbumDetailsPageProps> = {}) {
  const defaultProps: AlbumDetailsPageProps = { id: "aId" };
  return render(
    <TestWrapper>
      <AlbumDetailsPage {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<AlbumDetailsPage />", () => {
  test("shows wiki and reviews", async () => {
    const { findByText, findAllByText } = renderComponent();

    await waitFor(async () =>
      expect(await findByText("content")).toBeInTheDocument()
    );

    expect(await findByText("content")).toBeInTheDocument();
    expect(await findByText("summary")).toBeInTheDocument();
    expect((await findAllByText("albumName"))[0]).toBeInTheDocument();
    expect(await findAllByText("reviewText")).toHaveLength(2);
  });
});
