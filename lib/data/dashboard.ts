import { books } from "./books";

const BOOK_STATUS = {
  READ: "LIDO",
  READING: "LENDO",
  PAUSED: "PAUSADO",
  WANT_TO_READ: "QUERO_LER",
  ABANDONED: "ABANDONADO",
} as const;

export function getDashboardStats() {
  const statusCount = books.reduce((countMap, currentBook) => {
    countMap[currentBook.status] = (countMap[currentBook.status] || 0) + 1;
    return countMap;
  }, {});

  const pagesRead = books
    .filter((book) => book.status === BOOK_STATUS.READ)
    .reduce((read, book) => read + book.pages, 0);

  const stats = [
    {
      label: "Livros Lidos",
      value: statusCount[BOOK_STATUS.READ] || 0,
      color: "#22c55e",
    },
    {
      label: "Lendo agora",
      value: statusCount[BOOK_STATUS.READING] || 0,
      color: "#3b82f6",
    },
    {
      label: "Pausados",
      value: statusCount[BOOK_STATUS.PAUSED] || 0,
      color: "#f59e0b",
    },
    {
      label: "Quero ler",
      value: statusCount[BOOK_STATUS.WANT_TO_READ] || 0,
      color: "#8b5cf6",
    },
    {
      label: "Abandonados",
      value: statusCount[BOOK_STATUS.ABANDONED] || 0,
      color: "#ef4444",
    },
  ];

  return { pagesRead, stats };
}
