import { Drawer } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "../../graphql/queryClient";
import server from "../mocks/server";
import AlbumDrawerContent, {
  AlbumDrawerContentProps
} from "./albumDrawerContent";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

function renderAlbumDrawerContent(
  props: Partial<AlbumDrawerContentProps> = {}
) {
  const defaultProps: AlbumDrawerContentProps = {
    album: {
      id: "aId",
      mBid: "mbid",
      name: "name",
      year: 1999,
      details: {
        image: [
          {
            size: "mega",
            url: "url"
          }
        ]
      },
      performer: {
        id: "pId",
        name: "performer"
      }
    }
  };
  return render(
    <QueryClientProvider client={queryClient}>
      <Drawer isOpen onClose={() => void 0}>
        <AlbumDrawerContent {...{ ...defaultProps, ...props }} />
      </Drawer>
    </QueryClientProvider>
  );
}

describe("<AlbumDrawerContent />", () => {
  test("updates data with wiki content", async () => {
    const { findByText } = renderAlbumDrawerContent();

    expect(await findByText("name")).toBeInTheDocument();
    expect(await findByText("1999")).toBeInTheDocument();
    expect(await findByText("performer")).toBeInTheDocument();

    await waitFor(async () =>
      expect(await findByText("content")).toBeInTheDocument()
    );

    expect(await findByText("summary")).toBeInTheDocument();
  });
});
