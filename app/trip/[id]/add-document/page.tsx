"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import DocumentUploadForm from "@/components/trip/DocumentUploadForm";

export default function AddDocumentPage() {
  const params = useParams();

  const tripId = Number(params.id);

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <Link
          href={`/trip/${tripId}`}
          className="inline-block rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
        >
          ← Back to Trip
        </Link>

        <h1 className="mt-6 mb-2 text-3xl font-bold">
          Add Document
        </h1>

        <p className="mb-8 text-slate-500">
          Upload travel documents so everything is stored with your trip.
        </p>

        <DocumentUploadForm tripId={tripId} />

      </div>
    </main>
  );
}