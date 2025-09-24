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
  status: "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO";
};
