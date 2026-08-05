"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { createFlight } from "@/lib/flightService";
import { Flight } from "@/types/flight";

export default function AddFlightPage() {
  const router = useRouter();
  const params = useParams();

  const tripId = Number(params.id);

  const [airline, setAirline] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const [seat, setSeat] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");

  const [saving, setSaving] = useState(false);

  function handleDepartureDateChange(date: string) {
    setDepartureDate(date);

    if (!arrivalDate || arrivalDate < date) {
      setArrivalDate(date);
    }
  }

  function handleDepartureTimeChange(time: string) {
    setDepartureTime(time);

    if (!arrivalTime) {
      setArrivalTime(time);
    }
  }

  function combineDateTime(date: string, time: string): string | null {
    if (!date) return null;

    return `${date}T${time || "00:00"}:00`;
  }

  async function handleSave() {
    setSaving(true);

    try {
      const flight: Flight = {
        id: 0,
        tripId,

        createdAt: undefined,

        airline,
        flightNumber,
        confirmationNumber,

        departureAirport,
        arrivalAirport,

        departureDateTime: combineDateTime(departureDate, departureTime),
        arrivalDateTime: combineDateTime(arrivalDate, arrivalTime),

        seat,
        cabinClass: "",

        cost: null,

        notes: "",
      };

      await createFlight(flight);

      router.push(`/trip/${tripId}`);
      router.refresh();

    } catch (err) {
      console.error(err);
      alert("Unable to save flight.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <Link
          href={`/trip/${tripId}`}
          className="inline-block rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
        >
          ← Back to Trip
        </Link>

        <h1 className="mt-6 mb-2 text-3xl font-bold">
          Add Flight
        </h1>

        <p className="mb-8 text-slate-500">
          Only the basic flight information is required. You can always return later to complete the details.
        </p>

        <div className="space-y-6">

          <div>
            <label className="mb-2 block font-semibold">
              Airline *
            </label>

            <input
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Flight Number *
            </label>

            <input
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Departure Airport *
              </label>

              <input
                value={departureAirport}
                onChange={(e) => setDepartureAirport(e.target.value.toUpperCase())}
                className="w-full rounded-xl border p-3"
                maxLength={4}
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Arrival Airport *
              </label>

              <input
                value={arrivalAirport}
                onChange={(e) => setArrivalAirport(e.target.value.toUpperCase())}
                className="w-full rounded-xl border p-3"
                maxLength={4}
              />
            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Departure Date
              </label>

              <input
                type="date"
                value={departureDate}
                onChange={(e) => handleDepartureDateChange(e.target.value)}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Departure Time
              </label>

              <input
                type="time"
                value={departureTime}
                onChange={(e) => handleDepartureTimeChange(e.target.value)}
                className="w-full rounded-xl border p-3"
              />
            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Arrival Date
              </label>

              <input
                type="date"
                value={arrivalDate}
                min={departureDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Arrival Time
              </label>

              <input
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-full rounded-xl border p-3"
              />
            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Seat
              </label>

              <input
                value={seat}
                onChange={(e) => setSeat(e.target.value.toUpperCase())}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Confirmation Number
              </label>

              <input
                value={confirmationNumber}
                onChange={(e) => setConfirmationNumber(e.target.value.toUpperCase())}
                className="w-full rounded-xl border p-3"
              />
            </div>

          </div>

          <div className="flex justify-between">

            <Link
              href={`/trip/${tripId}`}
              className="rounded-xl bg-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-400"
            >
              Cancel
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
            >
              {saving ? "Saving..." : "Save Flight"}
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}