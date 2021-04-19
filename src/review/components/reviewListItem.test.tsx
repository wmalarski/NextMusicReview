import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import {
  albumGridItemDefault,
  reviewListItemDefault
} from "../../graphql/mocks/defaults";
import TestWrapper from "../../tests/components/testWrapper";
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
  test("shows review", async () => {
    const { findAllByText } = renderComponent();

    expect(await findAllByText("albumName")).toHaveLength(1);
    expect(await findAllByText("performerName")).toHaveLength(1);
    expect(await findAllByText("reviewText")).toHaveLength(1);
  });

  test("should shows review no album", async () => {
    const { findAllByText } = renderComponent({
      showImage: false,
      review: reviewListItemDefault
    });

    expect(await findAllByText("reviewText")).toHaveLength(1);
  });

  test("should shows review no cover", async () => {
    const { findAllByText } = renderComponent({
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
