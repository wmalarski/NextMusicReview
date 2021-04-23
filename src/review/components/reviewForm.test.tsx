import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import ReviewForm, { ReviewFormProps } from "./reviewForm";

function renderComponent(props: Partial<ReviewFormProps> = {}) {
  const defaultProps: ReviewFormProps = {
    albumId: "aaa",
    onCancel: () => void 0
  };
  return render(
    <TestWrapper>
      <ReviewForm {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<ReviewForm />", () => {
  it("should send review create mutation", async () => {
    expect.hasAssertions();
    const onCancel = jest.fn();
    sessionStorage.setItem("authorization", "barer ey0");
    renderComponent({ onCancel });

    userEvent.click(await screen.findByText("Save"));

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));

    expect(await screen.findByText("Review added")).toBeInTheDocument();
  });

  it("should send unauthorized review create mutation", async () => {
    expect.hasAssertions();
    const onCancel = jest.fn();
    renderComponent({ onCancel });

    userEvent.click(await screen.findByText("Save"));

    expect(await screen.findByText("Save not completed")).toBeInTheDocument();
  });

  it("should cancel creation form", async () => {
    expect.hasAssertions();
    const onCancel = jest.fn();
    renderComponent({ onCancel });

    userEvent.click(await screen.findByText("Cancel"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
