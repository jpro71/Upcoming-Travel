"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadDraft, saveDraft, clearDraft } from "@/lib/tripService";

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
    if (!endDate || endDate < date) setEndDate(date);
  }

  function handleNext() {
    saveDraft({ tripType, tripName, destination, startDate, endDate });
    router.push("/new-trip/planner");
  }

  function handleCancel() {
    clearDraft();
    router.push("/");
  }

  const inputClass =
    "w-full rounded-lg border border-[#D9C9AA] bg-white p-3 text-[#1A1A1A] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25";

  return (
    <main className="min-h-screen bg-[#FBF7EF] p-6 md:p-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-white shadow-lg">
        <div className="border-b border-[#D4AF37]/30 bg-[#FFFDF8] p-8">
          <div className="relative min-h-[250px] pr-0 md:pr-[500px]">
            <img
              src="/images/logos/StackedLogo.png"
              alt="PortalPuffin"
              className="mx-auto mb-6 h-auto w-[360px] object-contain md:absolute md:right-0 md:top-1/2 md:mb-0 md:h-auto md:w-[540px] md:max-w-none md:-translate-y-1/2 md:object-contain"
            />
          <button
            onClick={handleCancel}
            className="rounded-lg border border-[#D4AF37] bg-white px-4 py-2 text-sm font-semibold text-[#8F1724] transition hover:bg-[#F5E9D2]"
          >
            ← Back to Dashboard
          </button>

          <h1 className="mt-6 text-4xl font-bold text-[#1A1A1A]">
            Add New Trip
          </h1>
          <p className="mt-2 text-[#6B6B6B]">Step 1 of 3 — Trip Details</p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#F0E6D4]">
            <div className="h-full w-1/3 rounded-full bg-[#B01E2D]" />
          </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <label className="mb-4 block text-xl font-bold text-[#1A1A1A]">
            What type of trip are you planning?
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            {["Cruise", "Vacation", "Business", "Golf"].map((type) => (
              <label
                key={type}
                className={`cursor-pointer rounded-xl border-2 p-5 transition ${
                  tripType === type
                    ? "border-[#D4AF37] bg-[#F5E9D2] shadow-sm"
                    : "border-[#E7DDCA] bg-white hover:border-[#D4AF37] hover:bg-[#FFF9EE]"
                }`}
              >
                <input
                  type="radio"
                  name="tripType"
                  value={type}
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                  className="accent-[#B01E2D]"
                />
                <span className="ml-3 text-xl font-semibold text-[#1A1A1A]">
                  {type === "Cruise" && "🚢 "}
                  {type === "Vacation" && "✈️ "}
                  {type === "Business" && "💼 "}
                  {type === "Golf" && "⛳ "}
                  {type}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-[#1A1A1A]">Trip Name</label>
              <input value={tripName} onChange={(e) => setTripName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block font-semibold text-[#1A1A1A]">Destination</label>
              <input value={destination} onChange={(e) => setDestination(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block font-semibold text-[#1A1A1A]">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => handleStartDateChange(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block font-semibold text-[#1A1A1A]">End Date</label>
              <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="mt-10 flex justify-between border-t border-[#E7DDCA] pt-6">
            <button onClick={handleCancel} className="rounded-lg border border-[#D4AF37] bg-white px-6 py-3 font-semibold text-[#8F1724] transition hover:bg-[#F5E9D2]">
              Cancel
            </button>
            <button onClick={handleNext} className="rounded-lg bg-[#B01E2D] px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-[#8F1724]">
              Next →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
