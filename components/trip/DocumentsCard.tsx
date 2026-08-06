import Link from "next/link";
import { getDocuments } from "@/lib/documentService";
import DocumentActions from "@/components/trip/DocumentActions";

type Props = {
  tripId: number;
};

function formatFileSize(bytes?: number) {
  if (!bytes) return "";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function DocumentsCard({ tripId }: Props) {
  const documents = await getDocuments(tripId);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Documents</h2>

          <p className="mt-1 text-slate-500">
            Travel documents for this trip.
          </p>
        </div>

        <Link
          href={`/trip/${tripId}/add-document`}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Document
        </Link>
      </div>

      {documents.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-10 text-center">
          <p className="text-lg font-semibold text-slate-600">
            No documents uploaded yet.
          </p>

          <p className="mt-2 text-slate-500">
            Upload confirmations, boarding passes, tickets and more.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {documents.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
            >
              <div>
                <div className="font-semibold text-lg">
                  📄 {document.title}
                </div>

                <div className="text-sm text-slate-500">
                  {document.category}
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  {document.contentType || "Unknown"}
                  {document.fileSize
                    ? ` • ${formatFileSize(document.fileSize)}`
                    : ""}
                </div>
              </div>

              <DocumentActions
                documentId={document.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}