import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "../../graphql/queryClient";
import server from "../mocks/server";
import PerformerUpdateForm, {
  PerformerUpdateFormProps
} from "./performerUpdateForm";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  sessionStorage.clear();
  queryClient.clear();
});
afterAll(() => server.close());

function renderPerformerUpdateForm(
  props: Partial<PerformerUpdateFormProps> = {}
) {
  const defaultProps: PerformerUpdateFormProps = {
    performer: {
      id: "pid",
      name: "performer"
    },
    onCancel: () => void 0
  };
  return render(
    <QueryClientProvider client={queryClient}>
      <PerformerUpdateForm {...{ ...defaultProps, ...props }} />
    </QueryClientProvider>
  );
}

describe("<PerformerUpdateForm />", () => {
  test("sends performer update mutation", async () => {
    const onCancel = jest.fn();
    sessionStorage.setItem("authorization", "barer ey0");
    const { findByText } = renderPerformerUpdateForm({ onCancel });

    userEvent.click(await findByText("Save"));

    await waitFor(() => expect(onCancel).toBeCalled());

    expect(await findByText("Performer updated")).toBeInTheDocument();
  });

  test("sends unauthorized performer update mutation", async () => {
    const onCancel = jest.fn();
    const { findByText } = renderPerformerUpdateForm({ onCancel });

    userEvent.click(await findByText("Save"));

    expect(await findByText("Save not completed")).toBeInTheDocument();
  });

  test("cancels edit", async () => {
    const onCancel = jest.fn();
    const { findByText } = renderPerformerUpdateForm({ onCancel });

    userEvent.click(await findByText("Cancel"));

    expect(onCancel).toBeCalledTimes(1);
  });
});
