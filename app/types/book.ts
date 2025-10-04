export type ReadingStatus =
  | "QUERO LER"
  | "LENDO"
  | "LIDO"
  | "PAUSADO"
  | "ABANDONADO";

export type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  rating: number;
  synopsis: string;
  cover: string;
  status: ReadingStatus;
  currentPage?: number;
};
