import { ChakraProvider, theme } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClientProvider } from "react-query";
import server from "../../graphql/mocks/mockServer";
import queryClient from "../../graphql/queryClient";
import PerformerDeleteButton, {
  PerformerDeleteButtonProps
} from "./performerDeleteButton";

const push = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push
    };
  }
}));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
  push.mockClear();
});
afterAll(() => server.close());

function renderPerformerDeleteButton(
  props: Partial<PerformerDeleteButtonProps> = {}
) {
  const defaultProps: PerformerDeleteButtonProps = {
    performer: { id: "pId", name: "name" }
  };
  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <PerformerDeleteButton {...{ ...defaultProps, ...props }} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

describe("<PerformerDeleteButton />", () => {
  test("should succeed", async () => {
    sessionStorage.setItem("authorization", "barer ey0");

    const { findByText } = renderPerformerDeleteButton();

    userEvent.click(await findByText("Delete"));

    await waitFor(async () => expect(push).toBeCalledWith("/"));
  });

  // test("should show authorization error", async () => {
  //   const { findByText, findByAt } = renderPerformerDeleteButton();

  //   userEvent.click(await findByText("Delete"));
  //   expect(await findByTestId("chakra-toast-portal")).toBeInTheDocument();

  //   expect(await findByText("Cannot remove performer")).toBeInTheDocument();
  // });
});
