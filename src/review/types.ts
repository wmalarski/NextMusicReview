import {
  AlbumGridItemFragment,
  ReviewFilterInput,
  ReviewListItemFragment,
  ReviewSortInput
} from "../graphql/types";

export interface ReviewListItemArgs extends ReviewListItemFragment {
  album?: AlbumGridItemFragment | null;
}

export interface ReviewFilterState {
  where: ReviewFilterInput;
  sort: ReviewSortInput;
}
