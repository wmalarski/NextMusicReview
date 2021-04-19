import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
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
  test("should update sorting key", async () => {
    const setFilter = jest.fn(reducer => {
      const result: ReviewFilterState = reducer({
        sort: { rating: SortEnumType.Asc },
        where: {}
      });
      const resultEntries = Object.entries(result.sort);
      expect(resultEntries).toHaveLength(1);
      expect(result.sort.createdAt).toEqual(SortEnumType.Asc);
    });
    const { findByText, findByTitle } = renderComponent({ setFilter });

    userEvent.selectOptions(await findByTitle("Select key"), "Created At");
    userEvent.click(await findByText("Apply"));
  });

  test("should update sorting direction", async () => {
    const setFilter = jest.fn(reducer => {
      const result: ReviewFilterState = reducer({
        sort: { rating: SortEnumType.Asc },
        where: {}
      });
      const resultEntries = Object.entries(result.sort);
      expect(resultEntries).toHaveLength(1);
      expect(result.sort.rating).toEqual(SortEnumType.Desc);
    });
    const { findByText } = renderComponent({ setFilter });

    userEvent.click(await findByText("Desc"));
    userEvent.click(await findByText("Apply"));
  });
});
