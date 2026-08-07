"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  | "budget"
  | "notes";

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
  notes: false,
};

export default function PlannerPage() {
  const router = useRouter();

  const [selected, setSelected] =
    useState<Record<PlannerKey, boolean>>(DEFAULT_SELECTIONS);

  useEffect(() => {
    const draft = loadDraft();

    if (draft?.plannerItems) {
      setSelected({
        ...DEFAULT_SELECTIONS,
        ...draft.plannerItems,
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
      plannerItems: selected,
    });

    router.push("/new-trip/photo");
  }

  function previous() {
    saveDraft({
      plannerItems: selected,
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
            ? "border-blue-600 bg-blue-50"
            : "border-slate-200 hover:border-blue-500 hover:bg-slate-50"
        }`}
      >
        <div className="text-3xl">{icon}</div>

        <div className="mt-3 text-lg font-semibold">
          {title}
        </div>
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white shadow-lg">

        <div className="border-b p-8">

          <h1 className="text-4xl font-bold">
            Trip Planner
          </h1>

          <p className="mt-2 text-slate-600">
            Step 2 of 3 — Choose what you'd like to manage for this trip.
          </p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-2/3 bg-blue-600"></div>
          </div>

        </div>

        <div className="p-10">

          <h2 className="mb-4 text-xl font-bold">
            Transportation
          </h2>

          <div className="mb-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <PlannerCard icon="✈️" title="Flights" item="flights" />
            <PlannerCard icon="🚗" title="Rental Car" item="rentalCar" />
            <PlannerCard icon="🚆" title="Train" item="train" />
            <PlannerCard icon="⛴️" title="Ferry" item="ferry" />
          </div>

          <h2 className="mb-4 text-xl font-bold">
            Accommodations
          </h2>

          <div className="mb-10 grid gap-5 md:grid-cols-2">
            <PlannerCard icon="🏨" title="Hotel" item="hotel" />
            <PlannerCard
              icon="🏠"
              title="Vacation Rental"
              item="vacationRental"
            />
          </div>

          <h2 className="mb-4 text-xl font-bold">
            Planning
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <PlannerCard icon="📄" title="Documents" item="documents" />
            <PlannerCard icon="🍽️" title="Restaurants" item="restaurants" />
            <PlannerCard icon="🎟️" title="Activities" item="activities" />
            <PlannerCard icon="🧳" title="Packing List" item="packingList" />
            <PlannerCard icon="💰" title="Budget" item="budget" />
            <PlannerCard icon="📝" title="Notes" item="notes" />
          </div>

          <div className="mt-10 flex justify-between">

            <button
              type="button"
              onClick={previous}
              className="rounded-lg bg-slate-300 px-6 py-3 font-semibold"
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={next}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Next →
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}