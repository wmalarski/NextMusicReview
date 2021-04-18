import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import server from "../../graphql/mocks/mockServer";
import queryClient from "../../graphql/queryClient";
import ReviewForm, { ReviewFormProps } from "./reviewForm";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  sessionStorage.clear();
  queryClient.clear();
});
afterAll(() => server.close());

function renderReviewForm(props: Partial<ReviewFormProps> = {}) {
  const defaultProps: ReviewFormProps = {
    albumId: "aaa",
    onCancel: () => void 0
  };
  return render(
    <QueryClientProvider client={queryClient}>
      <ReviewForm {...{ ...defaultProps, ...props }} />
    </QueryClientProvider>
  );
}

describe("<ReviewForm />", () => {
  test("sends review create mutation", async () => {
    const onCancel = jest.fn();
    sessionStorage.setItem("authorization", "barer ey0");
    const { findByText } = renderReviewForm({ onCancel });

    userEvent.click(await findByText("Save"));

    await waitFor(() => expect(onCancel).toBeCalled());

    expect(await findByText("Review added")).toBeInTheDocument();
  });

  test("sends unauthorized review create mutation", async () => {
    const onCancel = jest.fn();
    const { findByText } = renderReviewForm({ onCancel });

    userEvent.click(await findByText("Save"));

    expect(await findByText("Save not completed")).toBeInTheDocument();
  });

  test("cancels creation form", async () => {
    const onCancel = jest.fn();
    const { findByText } = renderReviewForm({ onCancel });

    userEvent.click(await findByText("Cancel"));

    expect(onCancel).toBeCalledTimes(1);
  });
});
