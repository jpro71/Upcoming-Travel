"use client";

import { useState } from "react";
import { Trip } from "@/types/trip";
import { updateTrip } from "@/lib/tripService";

type Props = {
  trip: Trip;
};

export default function TripNotes({ trip }: Props) {
  const [notes, setNotes] = useState(trip.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    try {
      await updateTrip({
        ...trip,
        notes,
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Unable to save notes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Notes
        </h2>

        {saved && (
          <span className="text-sm font-semibold text-green-600">
            ✓ Changes saved
          </span>
        )}

      </div>

      <textarea
        className="h-80 w-full rounded-xl border border-slate-300 p-4"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add notes about this trip..."
      />

      <div className="mt-6">

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-400"
        >
          {saving ? "Saving..." : "Save Notes"}
        </button>

      </div>

    </div>
  );
}