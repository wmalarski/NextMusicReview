import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import { albumGridItemDefault } from "../../graphql/mocks/defaults";
import server from "../../graphql/mocks/mockServer";
import queryClient from "../../graphql/queryClient";
import AlbumForm, { AlbumFormProps } from "./albumForm";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  sessionStorage.clear();
  queryClient.clear();
});
afterAll(() => server.close());

function renderAlbumForm(props: Partial<AlbumFormProps> = {}) {
  const defaultProps: AlbumFormProps = {
    album: albumGridItemDefault,
    onCancel: () => void 0
  };
  return render(
    <QueryClientProvider client={queryClient}>
      <AlbumForm {...{ ...defaultProps, ...props }} />
    </QueryClientProvider>
  );
}

describe("<AlbumForm />", () => {
  test("sends album update mutation", async () => {
    const onCancel = jest.fn();
    sessionStorage.setItem("authorization", "barer ey0");
    const { findByText } = renderAlbumForm({ onCancel });

    userEvent.click(await findByText("Save"));

    await waitFor(() => expect(onCancel).toBeCalled());

    expect(await findByText("Album updated")).toBeInTheDocument();
  });

  test("sends unauthorized update mutation", async () => {
    const onCancel = jest.fn();
    const { findByText } = renderAlbumForm({ onCancel });

    userEvent.click(await findByText("Save"));

    expect(await findByText("Save not completed")).toBeInTheDocument();
  });

  test("cancels edit", async () => {
    const onCancel = jest.fn();
    const { findByText } = renderAlbumForm({ onCancel });

    userEvent.click(await findByText("Cancel"));

    expect(onCancel).toBeCalledTimes(1);
  });
});
