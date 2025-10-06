"use client";

import EditBookClient from "@/components/books/EditBookClient";
import { useParams } from "next/navigation";

export default function EditBookPage() {
  const params = useParams();

  if (!params.id) return <p className="p-6 text-center text-red-500">ID do livro não encontrado.</p>;

  return <EditBookClient id={params.id} />;
}
