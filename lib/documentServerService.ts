import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { mapDatabaseDocument } from "@/mappers/documentMapper";
import { TripDocument } from "@/types/document";

export async function getDocumentsServer(
  tripId: number
): Promise<TripDocument[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("trip_id", tripId)
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error("Error loading documents:", error);
    return [];
  }

  return (data ?? []).map(mapDatabaseDocument);
}

export async function getDocumentServer(
  id: number
): Promise<TripDocument | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error loading document:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return mapDatabaseDocument(data);
}

export async function createDocumentSignedUrlServer(
  filePath: string,
  downloadFileName?: string
): Promise<string> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.storage
    .from("trip-documents")
    .createSignedUrl(
      filePath,
      60 * 60,
      downloadFileName
        ? { download: downloadFileName }
        : undefined
    );

  if (error) {
    throw error;
  }

  return data.signedUrl;
}

export async function deleteDocumentServer(
  id: number,
  filePath: string
): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const { error: storageError } = await supabase.storage
    .from("trip-documents")
    .remove([filePath]);

  if (storageError) {
    throw storageError;
  }

  const { error: deleteError } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  if (deleteError) {
    throw deleteError;
  }
}