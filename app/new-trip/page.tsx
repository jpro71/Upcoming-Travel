"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  loadDraft,
  saveDraft,
  clearDraft,
} from "@/lib/tripService";

export default function NewTripPage() {
  const router = useRouter();

  const [tripType, setTripType] = useState("");
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const draft = loadDraft();

    if (!draft) return;

    setTripType(draft.tripType);
    setTripName(draft.tripName);
    setDestination(draft.destination);
    setStartDate(draft.startDate);
    setEndDate(draft.endDate);
  }, []);

  function handleStartDateChange(date: string) {
    setStartDate(date);

    if (!endDate || endDate < date) {
      setEndDate(date);
    }
  }

  function handleNext() {
    saveDraft({
      tripType,
      tripName,
      destination,
      startDate,
      endDate,
    });

    router.push("/new-trip/modules");
  }

  function handleCancel() {
    clearDraft();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white shadow-lg">

        <div className="border-b p-8">

          <button
            onClick={handleCancel}
            className="inline-block rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
          >
            ← Back to Dashboard
          </button>

          <h1 className="mt-6 text-4xl font-bold">
            Add New Trip
          </h1>

          <p className="mt-2 text-slate-600">
            Step 1 of 5 — Basic Information
          </p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/5 bg-blue-600"></div>
          </div>

        </div>

        <div className="p-10">

          <label className="mb-4 block text-xl font-bold">
            What type of trip are you planning?
          </label>

          <div className="grid gap-5 md:grid-cols-2">

            {["Cruise", "Vacation", "Business", "Golf"].map((type) => (

              <label
                key={type}
                className={`cursor-pointer rounded-xl border-2 p-6 transition ${
                  tripType === type
                    ? "border-blue-600 bg-blue-50"
                    : "hover:border-blue-600 hover:bg-blue-50"
                }`}
              >

                <input
                  type="radio"
                  name="tripType"
                  value={type}
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                  className="mr-3"
                />

                <span className="text-2xl font-semibold">
                  {type === "Cruise" && "🚢 "}
                  {type === "Vacation" && "✈️ "}
                  {type === "Business" && "💼 "}
                  {type === "Golf" && "⛳ "}
                  {type}
                </span>

              </label>

            ))}

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Trip Name
              </label>

              <input
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Destination
              </label>

              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

          </div>

          <div className="mt-10 flex justify-between">

            <button
              onClick={handleCancel}
              className="rounded-lg bg-slate-300 px-6 py-3 font-semibold"
            >
              Cancel
            </button>

            <button
              onClick={handleNext}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Next →
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}