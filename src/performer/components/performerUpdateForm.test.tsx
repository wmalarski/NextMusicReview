import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
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
  it("should send performer update mutation", async () => {
    expect.hasAssertions();
    const onCancel = jest.fn();
    sessionStorage.setItem("authorization", "barer ey0");
    renderComponent({ onCancel });

    userEvent.click(await screen.findByText("Save"));

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));

    expect(await screen.findByText("Performer updated")).toBeInTheDocument();
  });

  it("should send unauthorized performer update mutation", async () => {
    expect.hasAssertions();
    const onCancel = jest.fn();
    renderComponent({ onCancel });

    userEvent.click(await screen.findByText("Save"));

    expect(await screen.findByText("Save not completed")).toBeInTheDocument();
  });

  it("should cancel edit", async () => {
    expect.hasAssertions();
    const onCancel = jest.fn();
    renderComponent({ onCancel });

    userEvent.click(await screen.findByText("Cancel"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
