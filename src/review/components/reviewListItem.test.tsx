import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import {
  albumGridItemDefault,
  reviewListItemDefault
} from "../../graphql/mocks/defaults";
import ReviewListItem, { ReviewListItemProps } from "./reviewListItem";

function renderReviewsPage(props: Partial<ReviewListItemProps> = {}) {
  const defaultProps: ReviewListItemProps = {
    review: { ...reviewListItemDefault, album: albumGridItemDefault },
    showImage: true
  };
  return render(<ReviewListItem {...{ ...defaultProps, ...props }} />);
}

describe("<ReviewListItem />", () => {
  test("shows review", async () => {
    const { findAllByText } = renderReviewsPage();

    expect(await findAllByText("albumName")).toHaveLength(1);
    expect(await findAllByText("performerName")).toHaveLength(1);
    expect(await findAllByText("reviewText")).toHaveLength(1);
  });

  test("should shows review no album", async () => {
    const { findAllByText } = renderReviewsPage({
      showImage: false,
      review: reviewListItemDefault
    });

    expect(await findAllByText("reviewText")).toHaveLength(1);
  });

  test("should shows review no cover", async () => {
    const { findAllByText } = renderReviewsPage({
      review: {
        ...reviewListItemDefault,
        album: {
          ...albumGridItemDefault,
          details: undefined,
          performer: undefined
        }
      }
    });

    expect(await findAllByText("reviewText")).toHaveLength(1);
  });
});
