import { createDocument, uploadDocument } from "@/lib/documentService";
import { TripDocument } from "@/types/document";

type UploadRequest = {
  tripId: number;
  title: string;
  category: TripDocument["category"];
  notes: string;
  file: File;
};

export async function uploadTripDocument({
  tripId,
  title,
  category,
  notes,
  file,
}: UploadRequest) {
  const upload = await uploadDocument(tripId, file);

  return await createDocument({
    id: 0,

    tripId,

    title,
    category,

    fileName: upload.fileName,
    filePath: upload.filePath,

    fileSize: upload.fileSize,
    contentType: upload.contentType,

    notes,

    uploadedAt: undefined,
  });
}