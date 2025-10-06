import { NextRequest } from "next/server";
import { booksData } from "@/lib/data/books";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return Response.json(
        {
          success: false,
          error: "Invalid ID format",
        },
        { status: 400 }
      );
    }

    const book = booksData.getById(id);

    if (!book) {
      return Response.json(
        {
          success: false,
          error: "Book not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: book,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to fetch book",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return Response.json(
        {
          success: false,
          error: "Invalid ID format",
        },
        { status: 400 }
      );
    }

    const deletedBook = booksData.delete(id);

    if (!deletedBook) {
      return Response.json(
        {
          success: false,
          error: "Book not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to delete book",
      },
      { status: 500 }
    );
  }
}
