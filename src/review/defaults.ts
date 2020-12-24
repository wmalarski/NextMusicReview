import { SortEnumType } from "../graphql/types";
import { ReviewFilterState } from "./types";

export const defaultReviewFilterState: ReviewFilterState = {
  sort: {
    createdAt: SortEnumType.Desc
  },
  where: {}
};
