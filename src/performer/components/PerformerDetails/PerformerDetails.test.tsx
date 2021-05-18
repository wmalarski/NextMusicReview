import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import TestWrapper from "../../../tests/components/TestWrapper";
import { performerDetailsQueryDefault } from "../../../tests/defaults";
import PerformerDetails, { PerformerDetailsProps } from "./PerformerDetails";

function renderComponent(props: Partial<PerformerDetailsProps> = {}) {
  const defaultProps: PerformerDetailsProps = {
    query: performerDetailsQueryDefault
  };
  return render(
    <TestWrapper>
      <PerformerDetails {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<PerformerDetails />", () => {
  it("should display required information", async () => {
    expect.hasAssertions();

    renderComponent();

    expect((await screen.findAllByText("Albums")).length).toBeGreaterThan(0);
    expect((await screen.findAllByText("Reviews")).length).toBeGreaterThan(0);
  });

  it("should display when albums are not defined", async () => {
    expect.hasAssertions();

    renderComponent({
      query: {
        performer: {
          ...performerDetailsQueryDefault.performer,
          albums: undefined
        }
      }
    });

    expect(screen.queryByText("Albums")).toBeNull();
    expect(screen.queryByText("Reviews")).toBeNull();
  });

  it("should display when reviews are not defined", async () => {
    expect.hasAssertions();

    renderComponent({
      query: {
        performer: {
          ...performerDetailsQueryDefault.performer,
          albums: {
            nodes: performerDetailsQueryDefault.performer.albums?.nodes?.map(
              album => ({ ...album, reviews: undefined })
            )
          }
        }
      }
    });

    expect(screen.queryByText("Albums")).toBeInTheDocument();
    expect(screen.queryByText("Reviews")).toBeNull();
  });
});
