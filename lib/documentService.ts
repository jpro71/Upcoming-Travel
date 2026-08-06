import { supabase } from "@/lib/supabase";
import {
  mapDatabaseDocument,
  mapDocumentForDatabase,
} from "@/mappers/documentMapper";
import { TripDocument } from "@/types/document";

export async function getDocuments(
  tripId: number
): Promise<TripDocument[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("trip_id", tripId)
    .order("uploaded_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapDatabaseDocument);
}

export async function createDocument(
  document: TripDocument
): Promise<TripDocument> {
  const { data, error } = await supabase
    .from("documents")
    .insert(mapDocumentForDatabase(document))
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseDocument(data);
}

export async function deleteDocument(
  id: number
): Promise<void> {
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  if (error) throw error;
}