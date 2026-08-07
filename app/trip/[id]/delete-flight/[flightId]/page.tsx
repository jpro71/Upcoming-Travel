import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  getFlight,
  deleteFlight,
} from "@/lib/flightService";

type Props = {
  params: Promise<{
    id: string;
    flightId: string;
  }>;
};

export default async function DeleteFlightPage({
  params,
}: Props) {
  const { id, flightId } = await params;

  const flight = await getFlight(
    Number(flightId)
  );

  if (!flight) {
    notFound();
  }

  async function deleteCurrentFlight() {
    "use server";

    await deleteFlight(flight.id);

    redirect(`/trip/${id}`);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-md">

        <h1 className="text-3xl font-bold text-red-600">
          Delete Flight
        </h1>

        <p className="mt-6 text-lg">
          Are you sure you want to delete this flight?
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

          <div className="text-xl font-semibold">
            {flight.airline} {flight.flightNumber}
          </div>

          <div className="mt-2 text-slate-600">
            {flight.departureAirport} → {flight.arrivalAirport}
          </div>

          {flight.departureDateTime && (
            <div className="mt-2 text-sm text-slate-500">
              Departure:{" "}
              {new Date(
                flight.departureDateTime
              ).toLocaleString()}
            </div>
          )}

        </div>

        <form
          action={deleteCurrentFlight}
          className="mt-8"
        >

          <div className="flex justify-between">

            <Link
              href={`/trip/${id}`}
              className="rounded-xl bg-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-400"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Delete Flight
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}