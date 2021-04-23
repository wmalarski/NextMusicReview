import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import TestWrapper from "../../tests/components/testWrapper";
import PerformerActionsBar, {
  PerformerActionsBarProps
} from "./performerActionsBar";

function renderComponent(props: Partial<PerformerActionsBarProps> = {}) {
  const defaultProps: PerformerActionsBarProps = {
    performer: { id: "pId", name: "PerformerName" }
  };
  return render(
    <TestWrapper>
      <PerformerActionsBar {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

jest.mock("@chakra-ui/media-query", () => ({
  useMediaQuery: jest.fn().mockReturnValue([false])
}));

describe("<PerformerActionsBar />", () => {
  const { useMediaQuery } = jest.requireMock("@chakra-ui/media-query");

  afterEach(() => useMediaQuery.mockClear());

  it("should display required information", async () => {
    expect.hasAssertions();

    renderComponent();

    expect((await screen.findAllByText("Delete")).length).toBeGreaterThan(0);
    expect((await screen.findAllByText("Edit")).length).toBeGreaterThan(0);
  });

  it("should display required information and isMd", async () => {
    expect.hasAssertions();

    useMediaQuery.mockReturnValueOnce([true]);
    renderComponent();

    expect((await screen.findAllByText("Delete")).length).toBeGreaterThan(0);
    expect((await screen.findAllByText("Edit")).length).toBeGreaterThan(0);
  });

  it("should display nothing", async () => {
    expect.hasAssertions();
    renderComponent({ performer: undefined });

    expect(screen.queryByText("Delete")).toBeNull();
    expect(screen.queryByText("Update")).toBeNull();
  });
});
