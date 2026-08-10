import Link from "next/link";
import { notFound } from "next/navigation";

import { getTripServer } from "@/lib/tripServerService";

import FlightForm from "@/components/trip/FlightForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AddFlightPage({
  params,
}: Props) {
  const { id } = await params;

  const trip = await getTripServer(Number(id));

  if (!trip) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Add Flight
            </h1>

            <p className="mt-2 text-slate-500">
              Enter your flight reservation details.
            </p>
          </div>

          <Link
            href={`/trip/${id}`}
            className="rounded-xl bg-slate-200 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </Link>
        </div>

        <FlightForm
          tripId={trip.id}
          defaultDepartureDate={trip.startDate}
          defaultArrivalDate={trip.startDate}
        />
      </div>
    </main>
  );
}