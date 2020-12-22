import { Image } from "../graphql/types";

export interface AlbumItem {
  id: string;
  name: string;
  performer: {
    id: string;
    name: string;
  } | null;
  year: number;
  details: {
    image: Image[];
  } | null;
}
