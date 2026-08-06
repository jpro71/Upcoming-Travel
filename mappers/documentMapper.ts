import { TripDocument } from "@/types/document";

export function mapDatabaseDocument(row: any): TripDocument {
  return {
    id: row.id,
    tripId: row.trip_id,

    title: row.title,
    category: row.category,

    fileName: row.file_name,
    filePath: row.file_path,

    notes: row.notes ?? "",

    uploadedAt: row.uploaded_at,
  };
}

export function mapDocumentForDatabase(document: TripDocument) {
  return {
    trip_id: document.tripId,

    title: document.title,
    category: document.category,

    file_name: document.fileName,
    file_path: document.filePath,

    notes: document.notes,
  };
}