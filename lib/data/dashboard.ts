import { booksData } from "./books";
import type { Book, ReadingStatus } from "@/app/types/book";

export interface Stat {
  label: string;
  value: number | null;
  change?: string;
  status?: ReadingStatus;
  color?: string;
  trend?: "up" | "down" | "stable";
}
export interface GenreStats {
  mostReadGenre: string | null;
  genreCount: number;
}
export interface DashboardStats {
  stats: Stat[];
  pagesRead: number;
  genreStats: GenreStats;
}
const STATUS_LABELS: Record<ReadingStatus, string> = {
  LIDO: "Livros Lidos",
  LENDO: "Lendo agora",
  PAUSADO: "Pausados",
  "QUERO LER": "Quero ler",
  ABANDONADO: "Abandonados",
};

export function getDashboardStats(): DashboardStats {
  const books: Book[] = booksData.getAll();

  const statusCount: Record<ReadingStatus, number> = {
    LIDO: 0,
    LENDO: 0,
    PAUSADO: 0,
    "QUERO LER": 0,
    ABANDONADO: 0,
  };

  for (const book of books) {
    if (statusCount[book.status as ReadingStatus] !== undefined) {
      statusCount[book.status as ReadingStatus]++;
    }
  }

  const pagesRead = books
    .filter((book) => book.status === "LIDO")
    .reduce((total, book) => total + book.pages, 0);

  const genreCount: Record<string, number> = {};
  const completedBooks = books.filter((book) => book.status === "LIDO");

  for (const book of completedBooks) {
    genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
  }

  let mostReadGenre: string | null = null;
  let maxCount = 0;

  for (const [genre, count] of Object.entries(genreCount)) {
    if (count > maxCount) {
      maxCount = count;
      mostReadGenre = genre;
    }
  }

  const genreStats: GenreStats = {
    mostReadGenre,
    genreCount: maxCount,
  };

  const stats: Stat[] = [
    {
      label: "Livros Lidos",
      value: statusCount.LIDO,
      color: "#22c55e",
      status: "LIDO",
      change: "+1 este mês",
      trend: "up",
    },
    {
      label: "Lendo agora",
      value: statusCount.LENDO,
      color: "#3b82f6",
      status: "LENDO",
      change: "Em progresso",
      trend: "stable",
    },
    {
      label: "Pausados",
      value: statusCount.PAUSADO,
      color: "#f59e0b",
      status: "PAUSADO",
      change: "Retomar em breve",
      trend: "stable",
    },
    {
      label: "Quero ler",
      value: statusCount["QUERO LER"],
      color: "#8b5cf6",
      status: "QUERO LER",
      change: "+2 esta semana",
      trend: "up",
    },
    {
      label: "Abandonados",
      value: statusCount.ABANDONADO,
      color: "#ef4444",
      status: "ABANDONADO",
      change: "Sem mudanças",
      trend: "stable",
    },
  ];

  return { pagesRead, stats, genreStats };
}
