import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Mantém como string
    
    // ✅ Remove a conversão para número
    // ❌ NÃO FAZ: const idNumero = parseInt(id);
    
    // Verifica se o UUID é válido (opcional)
    if (!id || id.length < 10) {
      return new Response(
        JSON.stringify({ success: false, error: "ID inválido" }), 
        { status: 400 }
      );
    }

    // Usa o ID diretamente como string
    const res = await fetch(`${"/api/books"}/${id}`);
    
    if (!res.ok) {
      return new Response(
        JSON.stringify({ success: false, error: "Livro não encontrado" }), 
        { status: 404 }
      );
    }

    const data = await res.json();
    return new Response(
      JSON.stringify({ success: true, data }), 
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: "Erro ao buscar livro" }), 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ success: false, error: "ID inválido" }), { status: 400 });
  }

  try {
    const res = await fetch(`${"/api/books"}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      return new Response(JSON.stringify({ success: false, error: "Livro não encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: "Livro deletado com sucesso" }));
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Erro ao deletar livro" }), { status: 500 });
  }
}
