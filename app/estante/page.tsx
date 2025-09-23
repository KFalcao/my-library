"use client";

import { useState } from "react";
import { books, Book } from "@/lib/data/books";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

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
            <SelectItem value="Literatura Brasileira">Literatura Brasileira</SelectItem>
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
          <Card key={book.id} className="shadow-lg hover:shadow-xl transition">
            <CardHeader className="p-0">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-60 object-contain rounded-t-xl"
              />
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <p className="text-xs text-gray-500">
                {book.year} • {book.genre}
              </p>

              {/* Avaliação por estrelas */}
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < book.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Ver
              </Button>
              <Button variant="outline" size="sm">
                Editar
              </Button>
              <Button variant="destructive" size="sm">
                Excluir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
