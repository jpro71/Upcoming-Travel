"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loadDraft,
  saveDraft,
  clearDraft,
} from "@/lib/tripService";

type FormErrors = {
  tripType?: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
};

export default function NewTripPage() {
  const router = useRouter();

  const [tripType, setTripType] = useState("");
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

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

    setErrors((current) => ({
      ...current,
      startDate: undefined,
    }));

    if (!endDate || endDate < date) {
      setEndDate(date);
    }
  }

  function validateForm() {
    const newErrors: FormErrors = {};

    if (!tripType) {
      newErrors.tripType = "Please select a trip type.";
    }

    if (!destination.trim()) {
      newErrors.destination = "Please enter a destination.";
    }

    if (!startDate) {
      newErrors.startDate = "Please select a start date.";
    }

    if (!endDate) {
      newErrors.endDate = "Please select an end date.";
    }

    if (startDate && endDate && endDate < startDate) {
      newErrors.endDate =
        "End date cannot be earlier than the start date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (!validateForm()) {
      return;
    }

    saveDraft({
      tripType,
      tripName,
      destination: destination.trim(),
      startDate,
      endDate,
    });

    router.push("/new-trip/planner");
  }

  function handleCancel() {
  clearDraft();
  router.push("/dashboard");
}

  const inputClass =
    "w-full rounded-lg border border-[#D9C9AA] bg-white p-3 text-[#1A1A1A] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25";

  const errorInputClass =
    "w-full rounded-lg border border-red-500 bg-white p-3 text-[#1A1A1A] outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <main className="min-h-screen bg-[#F8F4EC] px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#E7DDCA] bg-white shadow-sm">
        <div className="border-b border-[#E7DDCA] bg-[#FFF9EE] p-8">
          <button
            type="button"
            onClick={handleCancel}
            className="font-semibold text-[#8F1724] hover:underline"
          >
            ← Back to Dashboard
          </button>

          <h1 className="mt-6 text-4xl font-bold text-[#1A1A1A]">
            Add New Trip
          </h1>

          <p className="mt-2 text-[#6B6B6B]">
            Step 1 of 3 — Trip Details
          </p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#F0E6D4]">
            <div className="h-full w-1/3 rounded-full bg-[#B01E2D]" />
          </div>
        </div>

        <div className="p-8 md:p-10">
          <label className="mb-4 block text-xl font-bold text-[#1A1A1A]">
            What type of trip are you planning?
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            {["Cruise", "Vacation", "Business", "Golf"].map(
              (type) => (
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
                    onChange={() => {
                      setTripType(type);

                      setErrors((current) => ({
                        ...current,
                        tripType: undefined,
                      }));
                    }}
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
              )
            )}
          </div>

          {errors.tripType && (
            <p className="mt-2 text-sm font-semibold text-red-600">
              {errors.tripType}
            </p>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-[#1A1A1A]">
                Trip Name
              </label>

              <input
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className={inputClass}
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-[#1A1A1A]">
                Destination
              </label>

              <input
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);

                  setErrors((current) => ({
                    ...current,
                    destination: undefined,
                  }));
                }}
                className={
                  errors.destination
                    ? errorInputClass
                    : inputClass
                }
              />

              {errors.destination && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  {errors.destination}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-semibold text-[#1A1A1A]">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  handleStartDateChange(e.target.value)
                }
                className={
                  errors.startDate
                    ? errorInputClass
                    : inputClass
                }
              />

              {errors.startDate && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  {errors.startDate}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-semibold text-[#1A1A1A]">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => {
                  setEndDate(e.target.value);

                  setErrors((current) => ({
                    ...current,
                    endDate: undefined,
                  }));
                }}
                className={
                  errors.endDate
                    ? errorInputClass
                    : inputClass
                }
              />

              {errors.endDate && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 flex justify-between border-t border-[#E7DDCA] pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-[#D4AF37] bg-white px-6 py-3 font-semibold text-[#8F1724] transition hover:bg-[#F5E9D2]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-[#B01E2D] px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-[#8F1724]"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}