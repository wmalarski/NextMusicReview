import {
  AlbumGridItemFragment,
  ReviewListItemFragment
} from "../graphql/types";

export interface ReviewListItemArgs extends ReviewListItemFragment {
  album?: AlbumGridItemFragment | null;
}
