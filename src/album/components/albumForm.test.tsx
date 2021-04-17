import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "../../graphql/queryClient";
import server from "../mocks/server";
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
    album: {
      id: "aId",
      mBid: "mbid",
      name: "name",
      year: 1999,
      details: {
        image: [
          {
            size: "large",
            url: "url"
          }
        ]
      },
      performer: {
        id: "pId",
        name: "performer"
      }
    },
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
});
