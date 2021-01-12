import { Dispatch, SetStateAction } from "react";

export interface AlbumSearchHit {
  id: string;
  name: string;
  performer: string;
  year: number;
  performerId: string;
  objectID: string;
  imageUrl?: string | null;
}

export interface SearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
