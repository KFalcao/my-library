export type Book = {
  id: string;
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

export const books = [
  {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    genre: "Literatura Brasileira",
    year: 1899,
    pages: 256,
    rating: 5,
    synopsis:
      "A clássica história de Bentinho e Capitu, explorando ciúmes, amor e a dúvida eterna sobre a traição.",
    cover: "https://m.media-amazon.com/images/I/81a4kCNuH+L.jpg",
    status: "LIDO",
  },
  {
    id: "2",
    title: "Duna",
    author: "Frank Herbert",
    genre: "Ficção Científica",
    year: 1965,
    pages: 688,
    rating: 4,
    synopsis:
      "Um épico de ficção científica sobre política, religião e ecologia em Arrakis, o planeta desértico.",
    cover: "https://m.media-amazon.com/images/I/81zN7udGRUL.jpg",
    status: "LENDO",
  },
  {
    id: "3",
    title: "O Nome do Vento",
    author: "Patrick Rothfuss",
    genre: "Fantasia",
    year: 2007,
    pages: 656,
    rating: 5,
    synopsis:
      "Kvothe narra sua própria história: sua infância em uma trupe, seus anos como órfão e seus estudos na Universidade.",
    cover: "https://m.media-amazon.com/images/I/81CGmkRG9GL._UF1000,1000_QL80_.jpg",
    status: "QUERO_LER",
  },
  {
    id: "4",
    title: "Sapiens: Uma Breve História da Humanidade",
    author: "Yuval Noah Harari",
    genre: "História",
    year: 2011,
    pages: 464,
    rating: 4,
    synopsis:
      "Uma exploração sobre como o Homo sapiens dominou o mundo e moldou sociedades, culturas e economias.",
    cover: "https://www.lpm.com.br/livros/imagens/sapiens_9788525438393_hd.jpg",
    status: "LENDO",
  },
  {
    id: "5",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programação",
    year: 2008,
    pages: 464,
    rating: 5,
    synopsis:
      "Um guia prático para escrever código limpo, sustentável e fácil de manter em projetos de software.",
    cover:
      "https://m.media-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
    status: "PAUSADO",
  },
  {
    id: "6",
    title: "1984",
    author: "George Orwell",
    genre: "Distopia",
    year: 1949,
    pages: 328,
    rating: 5,
    synopsis:
      "Um clássico da ficção distópica sobre vigilância governamental, controle de informação e manipulação da verdade.",
    cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
    status: "LIDO",
  },
  {
    id: "7",
    title: "O Temor do Sábio",
    author: "Patrick Rothfuss",
    genre: "Fantasia",
    year: 2011,
    pages: 994,
    rating: 0,
    synopsis:
      "Continuação da história de Kvothe, onde ele enfrenta desafios ainda maiores na Universidade e além.",
    cover: "https://m.media-amazon.com/images/I/91rGGj7JBhL._UF1000,1000_QL80_.jpg",
    status: "QUERO_LER",
  },
  {
    id: "8",
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    genre: "Literatura Infantil",
    year: 1943,
    pages: 96,
    rating: 5,
    synopsis:
      "Uma fábula poética e filosófica sobre amizade, amor e a essência da vida, através dos olhos de uma criança.",
    cover: "https://m.media-amazon.com/images/I/81SVIwe5L9L._UF1000,1000_QL80_.jpg",
    status: "ABANDONADO",
  },
];
