import { NextRequest } from "next/server";
import { booksData } from "@/lib/data/books";

export async function GET() {
  try {
    const books = booksData.getAll();

    return Response.json({
      success: true,
      data: books,
      count: books.length,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to fetch books",
      },
      { status: 500 }
    );
  }
}
