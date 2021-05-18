import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import TestWrapper from "../../../tests/components/TestWrapper";
import {
  albumDetailsQueryDefault,
  albumGridItemDefault
} from "../../../tests/defaults";
import AlbumDetails, { AlbumDetailsProps } from "./AlbumDetails";

function renderComponent(props: Partial<AlbumDetailsProps> = {}) {
  const defaultProps: AlbumDetailsProps = {
    id: "albumId",
    isLoading: false,
    detailsQuery: albumDetailsQueryDefault,
    reviewsQuery: { album: albumGridItemDefault }
  };
  return render(
    <TestWrapper>
      <AlbumDetails {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<AlbumDetails />", () => {
  it("should display all information", async () => {
    expect.hasAssertions();

    renderComponent();

    expect(await screen.findByText("content")).toBeInTheDocument();
    expect(await screen.findByText("summary")).toBeInTheDocument();
    expect((await screen.findAllByText("albumName"))[0]).toBeInTheDocument();
  });

  it("should display image", async () => {
    expect.hasAssertions();

    renderComponent({
      reviewsQuery: {
        album: {
          ...albumGridItemDefault,
          details: {
            image: [
              {
                size: "extralarge",
                url: "aaa"
              }
            ]
          }
        }
      }
    });

    expect(await screen.findByText("content")).toBeInTheDocument();
  });
});
