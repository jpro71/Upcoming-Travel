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

export async function uploadDocument(
  tripId: number,
  file: File
): Promise<{
  fileName: string;
  filePath: string;
  fileSize: number;
  contentType: string;
}> {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `${tripId}/${fileName}`;

  const { error } = await supabase.storage
    .from("trip-documents")
    .upload(filePath, file);

  if (error) throw error;

  return {
    fileName: file.name,
    filePath,
    fileSize: file.size,
    contentType: file.type,
  };
}

export async function getDocumentUrl(
  filePath: string
): Promise<string> {
  const { data, error } = await supabase.storage
    .from("trip-documents")
    .createSignedUrl(filePath, 60 * 60);

  if (error) throw error;

  return data.signedUrl;
}

export async function deleteDocument(
  id: number,
  filePath: string
): Promise<void> {
  const { error: storageError } = await supabase.storage
    .from("trip-documents")
    .remove([filePath]);

  if (storageError) throw storageError;

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  if (error) throw error;
}