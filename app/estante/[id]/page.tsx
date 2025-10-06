"use client";

import { Book, db } from "@/lib/data/db";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (params.id) {
      db.books.get(params.id).then((data) => {
        if (data) setBook(data);
      });
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (!params.id) return;
    await db.books.delete(params.id);
    router.push("/estante");
  };

  if (!book) return <p className="p-6 text-center">Carregando livro...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="border rounded-lg shadow-md p-4">
        <img
          src={book.cover || "/default-cover.png"}
          alt={book.title}
          className="w-full h-80 object-cover rounded-md mb-4"
          onError={(e) => (e.currentTarget.src = "/default-cover.png")}
        />

        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-muted-foreground mb-1"><strong>Autor:</strong> {book.author}</p>
        <p className="text-lg text-muted-foreground mb-1"><strong>Gênero:</strong> {book.genre || "Não informado"}</p>
        {book.year && <p className="text-lg text-muted-foreground mb-1"><strong>Ano:</strong> {book.year}</p>}
        {book.pages && <p className="text-lg text-muted-foreground mb-1"><strong>Páginas:</strong> {book.pages}</p>}
        {book.rating !== undefined && (
          <p className="text-lg text-muted-foreground mb-1">
            <strong>Avaliação:</strong> {book.rating > 0 ? `${book.rating}/5` : "Ainda não avaliado"}
          </p>
        )}
        <p className="text-lg text-muted-foreground mb-1"><strong>Status:</strong> {book.status}</p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Sinopse</h2>
        <p className="text-ring mb-6">{book.synopsis || "Nenhuma sinopse cadastrada."}</p>

        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/estante/${book.id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Excluir
          </button>
          <button
            onClick={() => router.push("/estante")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
