import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import PerformerUpdateForm, {
  PerformerUpdateFormProps
} from "./performerUpdateForm";

function renderComponent(props: Partial<PerformerUpdateFormProps> = {}) {
  const defaultProps: PerformerUpdateFormProps = {
    performer: {
      id: "pid",
      name: "performer"
    },
    onCancel: () => void 0
  };
  return render(
    <TestWrapper>
      <PerformerUpdateForm {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<PerformerUpdateForm />", () => {
  test("should send performer update mutation", async () => {
    const onCancel = jest.fn();
    sessionStorage.setItem("authorization", "barer ey0");
    const { findByText } = renderComponent({ onCancel });

    userEvent.click(await findByText("Save"));

    await waitFor(() => expect(onCancel).toBeCalled());

    expect(await findByText("Performer updated")).toBeInTheDocument();
  });

  test("should send unauthorized performer update mutation", async () => {
    const onCancel = jest.fn();
    const { findByText } = renderComponent({ onCancel });

    userEvent.click(await findByText("Save"));

    expect(await findByText("Save not completed")).toBeInTheDocument();
  });

  test("should cancel edit", async () => {
    const onCancel = jest.fn();
    const { findByText } = renderComponent({ onCancel });

    userEvent.click(await findByText("Cancel"));

    expect(onCancel).toBeCalledTimes(1);
  });
});
