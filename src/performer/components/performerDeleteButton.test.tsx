import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
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

afterEach(() => push.mockClear());

function renderComponent(props: Partial<PerformerDeleteButtonProps> = {}) {
  const defaultProps: PerformerDeleteButtonProps = {
    performer: { id: "pId", name: "name" }
  };
  return render(
    <TestWrapper>
      <PerformerDeleteButton {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<PerformerDeleteButton />", () => {
  test("should succeed", async () => {
    sessionStorage.setItem("authorization", "barer ey0");

    const { findByText } = renderComponent();

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
