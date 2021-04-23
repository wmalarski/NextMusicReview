import { UserProviderProps } from "@auth0/nextjs-auth0";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import UserHeader from "./userHeader";

function renderComponent(props: Partial<UserProviderProps> = {}) {
  return render(
    <TestWrapper userProps={props}>
      <UserHeader />
    </TestWrapper>
  );
}

describe("<UserHeader />", () => {
  it("should request fail", async () => {
    expect.hasAssertions();
    renderComponent();
    expect(
      await screen.findByText("The request to /api/auth/me failed")
    ).toBeInTheDocument();
  });

  it("should user be visible", async () => {
    expect.hasAssertions();
    renderComponent({
      user: {
        name: "UserName"
      }
    });
    expect(await screen.findByText("UserName")).toBeInTheDocument();
  });
});
