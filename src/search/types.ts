export interface AlbumSearchHit {
  id: string;
  name: string;
  performer: string;
  year: number;
  performerId: string;
  objectID: string;
  imageUrl?: string | null;
}
