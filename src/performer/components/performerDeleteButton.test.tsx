import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import PerformerDeleteButton, {
  PerformerDeleteButtonProps
} from "./performerDeleteButton";

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

describe("<PerformerDeleteButton />", () => {
  afterEach(() => push.mockClear());

  it("should succeed", async () => {
    expect.hasAssertions();
    sessionStorage.setItem("authorization", "barer ey0");

    renderComponent();

    userEvent.click(await screen.findByText("Delete"));

    await waitFor(async () => expect(push).toHaveBeenCalledWith("/"));
  });

  it.skip("should show authorization error", async () => {
    expect.hasAssertions();
    renderComponent();

    userEvent.click(await screen.findByText("Delete"));
    expect(
      await screen.findByTestId("chakra-toast-portal")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Cannot remove performer")
    ).toBeInTheDocument();
  });
});
