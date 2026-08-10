"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadDraft, saveDraft } from "@/lib/tripService";

type PlannerKey =
  | "flights"
  | "rentalCar"
  | "train"
  | "ferry"
  | "hotel"
  | "vacationRental"
  | "documents"
  | "restaurants"
  | "activities"
  | "packingList"
  | "budget";

const DEFAULT_SELECTIONS: Record<PlannerKey, boolean> = {
  flights: false,
  rentalCar: false,
  train: false,
  ferry: false,
  hotel: false,
  vacationRental: false,
  documents: false,
  restaurants: false,
  activities: false,
  packingList: false,
  budget: false,
};

export default function PlannerPage() {
  const router = useRouter();

  const [selected, setSelected] =
    useState<Record<PlannerKey, boolean>>(DEFAULT_SELECTIONS);

  useEffect(() => {
    const draft = loadDraft();

    if (draft?.plannerItems) {
      const { notes: _notes, ...plannerItems } =
        draft.plannerItems;

      setSelected({
        ...DEFAULT_SELECTIONS,
        ...plannerItems,
      });
    }
  }, []);

  function toggle(item: PlannerKey) {
    setSelected((current) => ({
      ...current,
      [item]: !current[item],
    }));
  }

  function next() {
    saveDraft({
      plannerItems: {
        ...selected,
        notes: false,
      },
    });

    router.push("/new-trip/photo");
  }

  function previous() {
    saveDraft({
      plannerItems: {
        ...selected,
        notes: false,
      },
    });

    router.push("/new-trip");
  }

  function PlannerCard({
    icon,
    title,
    item,
  }: {
    icon: string;
    title: string;
    item: PlannerKey;
  }) {
    const active = selected[item];

    return (
      <button
        type="button"
        onClick={() => toggle(item)}
        className={`rounded-xl border-2 p-5 text-left transition ${
          active
            ? "border-[#D4AF37] bg-[#F5E9D2] shadow-sm"
            : "border-[#E7DDCA] bg-white hover:border-[#D4AF37] hover:bg-[#FFF9EE]"
        }`}
      >
        <div className="text-3xl">{icon}</div>

        <div
          className={`mt-3 text-lg font-semibold ${
            active ? "text-[#8F1724]" : "text-[#1A1A1A]"
          }`}
        >
          {title}
        </div>

        {active && (
          <div className="mt-2 text-sm font-semibold text-[#8F1724]">
            ✓ Selected
          </div>
        )}
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F4EC] px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#E7DDCA] bg-white shadow-sm">
        <div className="border-b border-[#E7DDCA] bg-[#FFF9EE] p-8">
          <h1 className="text-3xl font-bold text-[#8F1724]">
            Trip Planner
          </h1>

          <p className="mt-2 text-[#5C554A]">
            Step 2 of 3 — Choose what you'd like to manage for
            this trip.
          </p>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="mb-4 border-l-4 border-[#D4AF37] pl-3 text-xl font-bold text-[#1A1A1A]">
            Transportation
          </h2>

          <div className="mb-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <PlannerCard
              icon="✈️"
              title="Flights"
              item="flights"
            />

            <PlannerCard
              icon="🚗"
              title="Rental Car"
              item="rentalCar"
            />

            <PlannerCard
              icon="🚆"
              title="Train"
              item="train"
            />

            <PlannerCard
              icon="⛴️"
              title="Ferry"
              item="ferry"
            />
          </div>

          <h2 className="mb-4 border-l-4 border-[#D4AF37] pl-3 text-xl font-bold text-[#1A1A1A]">
            Accommodations
          </h2>

          <div className="mb-9 grid gap-4 md:grid-cols-2">
            <PlannerCard
              icon="🏨"
              title="Hotel"
              item="hotel"
            />

            <PlannerCard
              icon="🏠"
              title="Vacation Rental"
              item="vacationRental"
            />
          </div>

          <h2 className="mb-4 border-l-4 border-[#D4AF37] pl-3 text-xl font-bold text-[#1A1A1A]">
            Planning
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PlannerCard
              icon="📄"
              title="Documents"
              item="documents"
            />

            <PlannerCard
              icon="🍽️"
              title="Restaurants"
              item="restaurants"
            />

            <PlannerCard
              icon="🎟️"
              title="Activities"
              item="activities"
            />

            <PlannerCard
              icon="🧳"
              title="Packing List"
              item="packingList"
            />

            <PlannerCard
              icon="💰"
              title="Budget"
              item="budget"
            />
          </div>

          <div className="mt-10 flex justify-between border-t border-[#E7DDCA] pt-6">
            <button
              type="button"
              onClick={previous}
              className="rounded-lg border border-[#D4AF37] bg-white px-6 py-3 font-semibold text-[#8F1724] transition hover:bg-[#F5E9D2]"
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={next}
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