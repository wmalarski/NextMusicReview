import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SortEnumType } from "../../graphql/types";
import TestWrapper from "../../tests/components/testWrapper";
import { ReviewFilterState } from "../types";
import ReviewFilter, { ReviewFilterProps } from "./reviewFilter";

function renderComponent(props: Partial<ReviewFilterProps> = {}) {
  const defaultProps: ReviewFilterProps = {
    filter: { sort: { rating: SortEnumType.Asc }, where: {} },
    setFilter: () => void 0
  };
  return render(
    <TestWrapper>
      <ReviewFilter {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  );
}

describe("<ReviewFilter />", () => {
  it("should update sorting key", async () => {
    expect.hasAssertions();
    const setFilter = jest.fn(reducer => {
      const result: ReviewFilterState = reducer({
        sort: { rating: SortEnumType.Asc },
        where: {}
      });
      const resultEntries = Object.entries(result.sort);
      expect(resultEntries).toHaveLength(1);
      expect(result.sort.createdAt).toStrictEqual(SortEnumType.Asc);
    });
    renderComponent({ setFilter });

    userEvent.selectOptions(
      await screen.findByTitle("Select key"),
      "Created At"
    );
    userEvent.click(await screen.findByText("Apply"));
  });

  it("should update sorting direction", async () => {
    expect.hasAssertions();
    const setFilter = jest.fn(reducer => {
      const result: ReviewFilterState = reducer({
        sort: { rating: SortEnumType.Asc },
        where: {}
      });
      const resultEntries = Object.entries(result.sort);
      expect(resultEntries).toHaveLength(1);
      expect(result.sort.rating).toStrictEqual(SortEnumType.Desc);
    });
    renderComponent({ setFilter });

    userEvent.click(await screen.findByText("Desc"));
    userEvent.click(await screen.findByText("Apply"));
  });
});
