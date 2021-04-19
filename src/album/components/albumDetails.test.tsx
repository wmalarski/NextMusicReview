import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import {
  albumDetailsQueryDefault,
  albumGridItemDefault
} from "../../graphql/mocks/defaults";
import queryClient from "../../graphql/queryClient";
import AlbumDetails, { AlbumDetailsProps } from "./albumDetails";

function renderComponent(props: Partial<AlbumDetailsProps> = {}) {
  const defaultProps: AlbumDetailsProps = {
    id: "albumId",
    isLoading: false,
    detailsQuery: albumDetailsQueryDefault,
    reviewsQuery: { album: albumGridItemDefault }
  };
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AlbumDetails {...{ ...defaultProps, ...props }} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

describe("<AlbumDetails />", () => {
  test("should display all information", async () => {
    const { findByText, findAllByText } = renderComponent();

    expect(await findByText("content")).toBeInTheDocument();
    expect(await findByText("summary")).toBeInTheDocument();
    expect((await findAllByText("albumName"))[0]).toBeInTheDocument();
  });

  test("should display all information", async () => {
    renderComponent({
      reviewsQuery: {
        album: {
          ...albumGridItemDefault,
          details: {
            image: [
              {
                size: "extralarge",
                url: "aaa"
              }
            ]
          }
        }
      }
    });
  });
});
