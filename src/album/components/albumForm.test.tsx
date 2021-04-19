import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { albumGridItemDefault } from "../../graphql/mocks/defaults";
import TestWrapper from "../../tests/components/testWrapper";
import AlbumForm, { AlbumFormProps } from "./albumForm";

function renderComponent(props: Partial<AlbumFormProps> = {}) {
  const defaultProps: AlbumFormProps = {
    album: albumGridItemDefault,
    onCancel: () => void 0
  };
  return render(
    <TestWrapper>
      <AlbumForm {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<AlbumForm />", () => {
  test("should send album update mutation", async () => {
    const onCancel = jest.fn();
    sessionStorage.setItem("authorization", "barer ey0");
    const { findByText } = renderComponent({ onCancel });

    userEvent.click(await findByText("Save"));

    await waitFor(() => expect(onCancel).toBeCalled());

    expect(await findByText("Album updated")).toBeInTheDocument();
  });

  test("should send unauthorized update mutation", async () => {
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
