"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createTrip,
  loadDraft,
  clearDraft,
} from "@/lib/tripService";

type TripInfo = {
  tripType: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export default function ModulesPage() {
  const router = useRouter();

  const [trip, setTrip] = useState<TripInfo | null>(null);

  const [cruise, setCruise] = useState(false);
  const [flights, setFlights] = useState(false);
  const [preHotel, setPreHotel] = useState(false);
  const [postHotel, setPostHotel] = useState(false);
  const [rentalCar, setRentalCar] = useState(false);
  const [insurance, setInsurance] = useState(false);

  useEffect(() => {
    const draft = loadDraft();

    if (!draft) return;

    setTrip(draft);

    if (draft.tripType === "Cruise") {
      setCruise(true);
    }

    // Nothing else defaults to selected.
  }, []);

  async function handleSave() {
    if (!trip) return;

    try {
      await createTrip(trip);

      clearDraft();

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Unable to save trip.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white shadow-lg">

        <div className="border-b p-8">

          <Link
            href="/new-trip"
            className="inline-block rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
          >
            ← Previous Step
          </Link>

          <h1 className="mt-6 text-4xl font-bold">
            Build Your Trip
          </h1>

          <p className="mt-2 text-slate-600">
            {trip?.tripName || "New Trip"}
          </p>

        </div>

        <div className="p-10">

          <div className="grid gap-6 md:grid-cols-2">

            {trip?.tripType === "Cruise" && (
              <label className="flex items-center gap-4 rounded-xl border p-6">
                <input
                  type="checkbox"
                  checked={cruise}
                  onChange={(e) => setCruise(e.target.checked)}
                />
                <span>🚢 Cruise</span>
              </label>
            )}

            <label className="flex items-center gap-4 rounded-xl border p-6">
              <input
                type="checkbox"
                checked={flights}
                onChange={(e) => setFlights(e.target.checked)}
              />
              <span>✈️ Flights</span>
            </label>

            <label className="flex items-center gap-4 rounded-xl border p-6">
              <input
                type="checkbox"
                checked={preHotel}
                onChange={(e) => setPreHotel(e.target.checked)}
              />
              <span>🏨 Pre-Trip Hotel</span>
            </label>

            <label className="flex items-center gap-4 rounded-xl border p-6">
              <input
                type="checkbox"
                checked={postHotel}
                onChange={(e) => setPostHotel(e.target.checked)}
              />
              <span>🏨 Post-Trip Hotel</span>
            </label>

            <label className="flex items-center gap-4 rounded-xl border p-6">
              <input
                type="checkbox"
                checked={rentalCar}
                onChange={(e) => setRentalCar(e.target.checked)}
              />
              <span>🚗 Rental Car</span>
            </label>

            <label className="flex items-center gap-4 rounded-xl border p-6">
              <input
                type="checkbox"
                checked={insurance}
                onChange={(e) => setInsurance(e.target.checked)}
              />
              <span>🛡️ Travel Insurance</span>
            </label>

          </div>

          <div className="mt-10 flex justify-between">

            <Link
              href="/new-trip"
              className="rounded-lg bg-slate-300 px-6 py-3 font-semibold"
            >
              ← Previous
            </Link>

            <button
              onClick={handleSave}
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Save Trip
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}