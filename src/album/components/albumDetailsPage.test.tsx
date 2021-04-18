import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "../../graphql/queryClient";
import AlbumDetailsPage, {
  AlbumDetailsPageProps
} from "../../pages/albums/[id]";
import server from "../mocks/server";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

function renderAlbumDetailsPage(props: Partial<AlbumDetailsPageProps> = {}) {
  const defaultProps: AlbumDetailsPageProps = { id: "aId" };
  return render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <AlbumDetailsPage {...{ ...defaultProps, ...props }} />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

describe("<AlbumDetailsPage />", () => {
  test("shows wiki and reviews", async () => {
    const { findByText, findAllByText } = renderAlbumDetailsPage();

    await waitFor(async () =>
      expect(await findByText("content")).toBeInTheDocument()
    );

    expect(await findByText("content")).toBeInTheDocument();
    expect(await findByText("summary")).toBeInTheDocument();
    expect((await findAllByText("albumName"))[0]).toBeInTheDocument();
    expect(await findAllByText("reviewText")).toHaveLength(2);
  });
});
