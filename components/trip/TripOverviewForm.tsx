"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trip, TripStatus } from "@/types/trip";
import { updateTrip, deleteTrip } from "@/lib/tripService";

type Props = {
  trip: Trip;
};

const statuses: TripStatus[] = [
  "Planning",
  "Booked",
  "Traveling",
  "Completed",
  "Cancelled",
];

export default function TripOverviewForm({ trip }: Props) {
  const router = useRouter();

  const [tripName, setTripName] = useState(trip.title);
  const [destination, setDestination] = useState(trip.destination);
  const [status, setStatus] = useState<TripStatus>(trip.status);
  const [startDate, setStartDate] = useState(trip.startDate);
  const [endDate, setEndDate] = useState(trip.endDate);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    try {
      await updateTrip({
        ...trip,
        title: tripName,
        destination,
        status,
        startDate,
        endDate,
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Unable to save trip.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this trip?"
    );

    if (!confirmed) return;

    try {
      await deleteTrip(trip.id);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Unable to delete trip.");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            Trip Overview
          </h2>

          <p className="mt-1 text-slate-500">
            Basic information about this trip.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {status}
        </span>

      </div>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-500">
            Trip Name
          </label>

          <input
            className="w-full rounded-xl border border-slate-300 p-3 text-lg"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-500">
            Destination
          </label>

          <input
            className="w-full rounded-xl border border-slate-300 p-3 text-lg"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">

          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-500">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TripStatus)}
              className="w-full rounded-xl border border-slate-300 p-3"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-500">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-500">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />
          </div>

        </div>

        <div className="flex items-center justify-between border-t pt-6">

          <div>
            {saved && (
              <span className="text-sm font-semibold text-green-600">
                ✓ Changes saved
              </span>
            )}
          </div>

          <div className="flex gap-3">

            <button
              onClick={handleDelete}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Delete Trip
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-400"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}