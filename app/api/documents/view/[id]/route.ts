import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
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

  const { data, error: urlError } = await supabase.storage
    .from("trip-documents")
    .createSignedUrl(document.file_path, 60 * 60);

  if (urlError) {
    return NextResponse.json(
      { error: urlError.message },
      { status: 500 }
    );
  }

  return NextResponse.redirect(data.signedUrl);
}