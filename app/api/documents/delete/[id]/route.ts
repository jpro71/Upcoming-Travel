import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: document, error } = await supabase
    .from("documents")
    .select("file_path")
    .eq("id", Number(id))
    .single();

  if (error || !document) {
    return NextResponse.json(
      { error: "Document not found." },
      { status: 404 }
    );
  }

  const { error: storageError } = await supabase.storage
    .from("trip-documents")
    .remove([document.file_path]);

  if (storageError) {
    return NextResponse.json(
      { error: storageError.message },
      { status: 500 }
    );
  }

  const { error: deleteError } = await supabase
    .from("documents")
    .delete()
    .eq("id", Number(id));

  if (deleteError) {
    return NextResponse.json(
      { error: deleteError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}