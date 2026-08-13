import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  getFlightServer,
  deleteFlightServer,
} from "@/lib/flightServerService";

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

  const flight = await getFlightServer(Number(flightId));

  if (!flight) {
    notFound();
  }

  const flightIdToDelete = flight.id;

  async function deleteCurrentFlight() {
    "use server";

    await deleteFlightServer(flightIdToDelete);

    redirect(`/trip/${id}`);
  }

  return (
    <main className="min-h-screen bg-[#FBF7EF] p-8">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-[#B01E2D]">
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

        <form action={deleteCurrentFlight} className="mt-8">
          <div className="flex justify-between">
            <Link
              href={`/trip/${id}`}
              className="rounded-xl bg-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-400"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-[#B01E2D] px-6 py-3 font-semibold text-white hover:bg-[#8F1724]"
            >
              Delete Flight
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}