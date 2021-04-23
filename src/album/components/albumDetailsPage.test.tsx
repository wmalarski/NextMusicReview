import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
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
  it("shows wiki and reviews", async () => {
    expect.hasAssertions();
    renderComponent();

    await waitFor(async () =>
      expect(await screen.findByText("content")).toBeInTheDocument()
    );

    expect(await screen.findByText("content")).toBeInTheDocument();
    expect(await screen.findByText("summary")).toBeInTheDocument();
    expect((await screen.findAllByText("albumName"))[0]).toBeInTheDocument();
    expect(await screen.findAllByText("reviewText")).toHaveLength(2);
  });
});
