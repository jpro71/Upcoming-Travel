"use client";

import { useRouter } from "next/navigation";

type Props = {
  documentId: number;
};

export default function DocumentActions({ documentId }: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this document?")) {
      return;
    }

    try {
      const response = await fetch(`/api/documents/delete/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error ?? "Unable to delete document.");
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Unable to delete document.");
    }
  }

  return (
    <div className="flex gap-2">

      <a
        href={`/api/documents/view/${documentId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        View
      </a>

      <a
        href={`/api/documents/download/${documentId}`}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Download
      </a>

      <button
        type="button"
        onClick={handleDelete}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Delete
      </button>

    </div>
  );
}