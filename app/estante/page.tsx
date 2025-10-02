"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, db } from "@/lib/data/db";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
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
          <Card key={book.id} className="shadow-lg hover:shadow-xl transition flex flex-col">
            <CardHeader className="p-0">
              <img
                src={book.cover || "/default-cover.png"}
                alt={book.title}
                className="w-full h-60 object-contain rounded-t-xl"
              />
            </CardHeader>
            <CardContent className="p-4 space-y-2 flex-1">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <p className="text-xs text-gray-500">
                {book.year} • {book.genre} • {book.status?.replace("_", " ")}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                {truncate(book.synopsis || "Nenhuma sinopse cadastrada.", 100)}
              </p>
              <div className="flex mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < (book.rating ?? 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button size="sm" onClick={() => router.push(`/estante/${book.id}`)}>Visualizar</Button>
              <Button variant="outline" size="sm" onClick={() => router.push(`/estante/${book.id}/edit`)}>Editar</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(book.id)}>Excluir</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
