"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Book } from "../types/book";
import { Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { truncate } from "@/lib/utils";


interface BookItemProps {
  book: Book;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export default function BookItem({
  book,
  onDelete,
  isLoading = false,
}: BookItemProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  function handleDelete(id: number): void {
    onDelete(id);
  }

  return (
    <Card key={book.id} className="shadow-lg hover:shadow-xl transition">
      <CardHeader className="p-0">
        <div className="relative group">
          <img
            src={book.cover || "/default-cover.png"}
            alt={book.title}
            className="w-full h-60 object-contain rounded-t-xl group-hover:brightness-25 transition"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-primary shadow-lg transition-all hover:bg-background hover:scale-110 hover:text-destructive">
                  <Trash
                    size={18}
                    className="text-muted-foreground hover:text-destructive transition cursor-pointer"
                  />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this item?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your book and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(book.id)}
                    disabled={isLoading}
                  >
                    Yes, I agree
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <p className="text-xs text-muted-foreground">
          {book.year} • {book.genre} • {book.status?.replace("_", " ")}
        </p>
        <p className="text-muted-foreground text-sm mt-2">
          {truncate(book.synopsis || "Nenhuma sinopse cadastrada.", 100)}
          </p>

        {/* Avaliação por estrelas */}
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < book.rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
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
  );
}
