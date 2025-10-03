"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, BookStatus, db, GENRES } from "@/lib/data/db";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddBookClient() {
  const [book, setBook] = useState<Book>({
    id: uuidv4(),
    title: "",
    author: "",
    genre: "",
    year: undefined,
    pages: undefined,
    rating: undefined,
    synopsis: "",
    cover: "",
    status: "QUERO_LER",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.books.add(book);
    router.push("/estante");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Adicionar Novo Livro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos de entrada */}
          <div>
            <label className="block text-sm font-medium mb-1">Título *</label>
            <Input required value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Autor *</label>
            <Input required value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gênero</label>
            <Select value={book.genre} onValueChange={(val) => setBook({ ...book, genre: val })}>
              <SelectTrigger><SelectValue placeholder="Selecione o gênero" /></SelectTrigger>
              <SelectContent>{GENRES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ano de publicação</label>
            <Input type="number" value={book.year ?? ""} onChange={(e) => setBook({ ...book, year: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total de páginas</label>
            <Input type="number" value={book.pages ?? ""} onChange={(e) => setBook({ ...book, pages: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Avaliação (1-5)</label>
            <Input type="number" value={book.rating ?? ""} onChange={(e) => setBook({ ...book, rating: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL da capa</label>
            <Input value={book.cover ?? ""} onChange={(e) => setBook({ ...book, cover: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status de leitura</label>
            <Select value={book.status} onValueChange={(val) => setBook({ ...book, status: val as BookStatus })}>
              <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="QUERO_LER">Quero Ler</SelectItem>
                <SelectItem value="LENDO">Lendo</SelectItem>
                <SelectItem value="LIDO">Lido</SelectItem>
                <SelectItem value="PAUSADO">Pausado</SelectItem>
                <SelectItem value="ABANDONADO">Abandonado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preview da capa */}
        <div>
          <label className="block text-sm font-medium mb-1">Preview da Capa</label>
          <img
            src={book.cover || "/default-cover.png"}
            alt="Preview da Capa"
            className="w-40 h-60 object-contain border rounded"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Adicionar</Button>
          <Button variant="outline" onClick={() => router.push("/estante")}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}
