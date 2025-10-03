"use client";

import { useEffect, useState } from "react";
import { Book } from "../types/book";
import { booksData } from "@/lib/data/books";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
import { useRouter } from "next/navigation";

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
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
  const [status, setStatus] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const all = await db.books.toArray();
      setBooks(all);
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "all" || book.genre === genre;
    const matchesStatus = status === "all" || book.status === status;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    await db.books.delete(id);
    setBooks(books.filter((b) => b.id !== id));
  };

  const truncate = (text: string, length: number) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📚 Minha Biblioteca</h1>
        <Button onClick={() => router.push("/estante/add")}>Adicionar Livro</Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Buscar por título ou autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/3"
        />

        <Select onValueChange={setGenre} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os gêneros</SelectItem>
            {["Literatura Brasileira","Ficção Científica","Fantasia","História","Programação"].map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setStatus} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="QUERO_LER">Quero Ler</SelectItem>
            <SelectItem value="LENDO">Lendo</SelectItem>
            <SelectItem value="LIDO">Lido</SelectItem>
            <SelectItem value="PAUSADO">Pausado</SelectItem>
            <SelectItem value="ABANDONADO">Abandonado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid de livros */}
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
