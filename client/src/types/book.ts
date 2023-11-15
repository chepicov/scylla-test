export interface Book {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price?: number;
  olVersion?: number;
  pageNumber: number;
}
