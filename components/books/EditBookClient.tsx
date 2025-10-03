"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, BookStatus, db, GENRES } from "@/lib/data/db";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EditBookClientProps {
  id: string;
}

export default function EditBookClient({ id }: EditBookClientProps) {
  const [book, setBook] = useState<Book | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      const b = await db.books.get(id);
      if (b) setBook(b);
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (book) {
      await db.books.put(book);
      router.push("/estante");
    }
  };

  if (!book) return <div>Carregando...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <img src={book.cover || "/default-cover.png"} alt="Preview da Capa" className="w-40 h-60 object-contain border rounded" />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Salvar</Button>
          <Button variant="outline" onClick={() => router.push("/estante")}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}
