import { UserProvider } from "@auth0/nextjs-auth0";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import UserHeader from "./userHeader";

function renderComponent(
  props: Partial<Parameters<typeof UserProvider>[0]> = {}
) {
  return render(
    <UserProvider {...props}>
      <UserHeader />
    </UserProvider>
  );
}

describe("<UserHeader />", () => {
  test("should request fail", async () => {
    const { findByText } = renderComponent();
    expect(
      await findByText("The request to /api/auth/me failed")
    ).toBeInTheDocument();
  });

  test("should user be visible", async () => {
    const { findByText } = renderComponent({
      user: {
        name: "UserName"
      }
    });
    expect(await findByText("UserName")).toBeInTheDocument();
  });
});
