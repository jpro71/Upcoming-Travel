import Link from "next/link";
import { trips } from "@/data/trips";
import { notFound } from "next/navigation";
import { formatDateRange, daysUntil } from "@/lib/dateUtils";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TripDetailsPage({ params }: Props) {
  const { id } = await params;

  const trip = trips.find((t) => t.id === Number(id));

  if (!trip) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">

        <div
          className="h-3 w-full"
          style={{ backgroundColor: trip.color }}
        />

        <div className="p-6 pb-0">
          <Link
            href="/"
            className="inline-block rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <img
          src={trip.image || "/images/norwegian-prima.jpg"}
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

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

            <div className="rounded-xl border bg-slate-50 p-6">
              <h2 className="mb-4 text-xl font-bold">Travel Information</h2>

              <p><strong>Airline:</strong> {trip.airline || "Not Assigned"}</p>
              <p><strong>Hotel:</strong> {trip.hotel || "Not Assigned"}</p>
              <p><strong>Cruise Line:</strong> {trip.cruiseLine || "N/A"}</p>
              <p><strong>Ship:</strong> {trip.ship || "N/A"}</p>
              <p><strong>Room:</strong> {trip.room || "N/A"}</p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-6">
              <h2 className="mb-4 text-xl font-bold">Travelers</h2>

              <ul className="list-disc pl-5">
                {trip.travelers.map((traveler) => (
                  <li key={traveler}>{traveler}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}