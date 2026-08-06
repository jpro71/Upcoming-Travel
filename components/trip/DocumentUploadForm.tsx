"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { uploadTripDocument } from "@/lib/documentUpload";

type Props = {
  tripId: number;
};

export default function DocumentUploadForm({ tripId }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Boarding Pass");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    setUploading(true);

    try {
      await uploadTripDocument({
        tripId,
        title,
        category: category as any,
        notes,
        file,
      });

      router.push(`/trip/${tripId}`);
      router.refresh();
    } catch (error: any) {
      console.error(error);

      alert(JSON.stringify(error, null, 2));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block font-semibold">
          Title
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Example: Southwest Boarding Pass"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border p-3"
        >
          <option>Boarding Pass</option>
          <option>Hotel Confirmation</option>
          <option>Cruise Documents</option>
          <option>Rental Car</option>
          <option>Passport</option>
          <option>Ticket</option>
          <option>Itinerary</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Select File
        </label>

        <input
          type="file"
          onChange={(e) => {
            const selected = e.target.files?.[0] ?? null;
            setFile(selected);
          }}
          className="w-full rounded-xl border p-3"
        />

        {file && (
          <div className="mt-3 rounded-lg bg-slate-100 p-3 text-sm">
            <div><strong>File:</strong> {file.name}</div>
            <div><strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB</div>
            <div><strong>Type:</strong> {file.type || "Unknown"}</div>
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Notes
        </label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>
    </div>
  );
}