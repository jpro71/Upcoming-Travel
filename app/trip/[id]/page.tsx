import Link from "next/link";
import { notFound } from "next/navigation";

import { getTrip } from "@/lib/tripService";
import { formatDateRange, daysUntil } from "@/lib/dateUtils";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TripDetailsPage({ params }: Props) {
  const { id } = await params;

  const trip = await getTrip(Number(id));

  if (!trip) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">

        <div
          className="h-3 w-full"
          style={{
            backgroundColor: trip.color || "#2563EB",
          }}
        />

        <div className="p-6 pb-0">
          <Link
            href="/"
            className="inline-block rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <img
          src={trip.image || "/images/default-trip.jpg"}
          alt={trip.title}
          className="h-80 w-full object-cover"
        />

        <div className="p-10">

          <div className="text-sm uppercase tracking-widest text-slate-500">
            {trip.type}
          </div>

          <h1 className="mt-3 text-5xl font-bold">
            {trip.title}
          </h1>

          <p className="mt-3 text-2xl text-slate-600">
            {trip.destination}
          </p>

          <p className="mt-4 text-lg text-slate-500">
            {formatDateRange(trip.startDate, trip.endDate)}
          </p>

          <div className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-xl font-semibold text-white">
            {daysUntil(trip.startDate)} Days Remaining
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border bg-slate-50 p-6">

              <h2 className="mb-4 text-xl font-bold">
                Trip Information
              </h2>

              <p><strong>Status:</strong> {trip.status}</p>

              <p><strong>Type:</strong> {trip.type}</p>

              <p><strong>Destination:</strong> {trip.destination}</p>

            </div>

            <div className="rounded-xl border bg-slate-50 p-6">

              <h2 className="mb-4 text-xl font-bold">
                Notes
              </h2>

              <p>
                {trip.notes || "No notes yet."}
              </p>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}