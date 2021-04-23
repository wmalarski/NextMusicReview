import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import {
  albumGridItemDefault,
  reviewListItemDefault
} from "../../tests/defaults";
import ReviewListItem, { ReviewListItemProps } from "./reviewListItem";

function renderComponent(props: Partial<ReviewListItemProps> = {}) {
  const defaultProps: ReviewListItemProps = {
    review: { ...reviewListItemDefault, album: albumGridItemDefault },
    showImage: true
  };
  return render(
    <TestWrapper>
      <ReviewListItem {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<ReviewListItem />", () => {
  it("shows review", async () => {
    expect.hasAssertions();
    renderComponent();

    expect(await screen.findAllByText("albumName")).toHaveLength(1);
    expect(await screen.findAllByText("performerName")).toHaveLength(1);
    expect(await screen.findAllByText("reviewText")).toHaveLength(1);
  });

  it("should shows review no album", async () => {
    expect.hasAssertions();
    renderComponent({
      showImage: false,
      review: reviewListItemDefault
    });

    expect(await screen.findAllByText("reviewText")).toHaveLength(1);
  });

  it("should shows review no cover", async () => {
    expect.hasAssertions();
    renderComponent({
      review: {
        ...reviewListItemDefault,
        album: {
          ...albumGridItemDefault,
          details: undefined,
          performer: undefined
        }
      }
    });

    expect(await screen.findAllByText("reviewText")).toHaveLength(1);
  });
});
