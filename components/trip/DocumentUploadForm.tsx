"use client";

import { useState } from "react";

export default function DocumentUploadForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Boarding Pass");
  const [notes, setNotes] = useState("");

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
          className="w-full rounded-xl border p-3"
        />
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
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Upload Document
      </button>

    </div>
  );
}