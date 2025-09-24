"use client";

import { useEffect, useState } from "react";
import { Book } from "../types/book";
import { booksData } from "@/lib/data/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import BookItem from "../components/BookItem";
import { toast } from "sonner";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/books");
      const result = await response.json();

      if (result.success) {
        setBooks(result.data);
      } else {
        setError(result.error || "Failed to fetch books");
      }
    } catch (err) {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      setActionLoading(id);

      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setBooks((prev) => prev.filter((b) => b.id !== id));
        toast.warning("Book deleted successfully");
      } else {
        setError(result.error || "Failed to delete book");
      }
    } catch (error) {
      setError("Connection error");
    } finally {
      setActionLoading(null);
    }
  };

  // Carregar todos na montagem do componente
  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesGenre = genre === "all" || book.genre === genre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📚 Minha Biblioteca</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Buscar por título ou autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/2"
        />

        <Select onValueChange={setGenre} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os gêneros</SelectItem>
            <SelectItem value="Literatura Brasileira">
              Literatura Brasileira
            </SelectItem>
            <SelectItem value="Ficção Científica">Ficção Científica</SelectItem>
            <SelectItem value="Fantasia">Fantasia</SelectItem>
            <SelectItem value="História">História</SelectItem>
            <SelectItem value="Programação">Programação</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid de Livros */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onDelete={deleteBook}
            isLoading={actionLoading === book.id}
          />
        ))}
      </div>

      {loading && <div>Carregando livros...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
