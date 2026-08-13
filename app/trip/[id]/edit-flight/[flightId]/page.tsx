import Link from "next/link";
import { notFound } from "next/navigation";

import { getFlightServer } from "@/lib/flightServerService";

import FlightForm from "@/components/trip/FlightForm";

type Props = {
  params: Promise<{
    id: string;
    flightId: string;
  }>;
};

export default async function EditFlightPage({
  params,
}: Props) {
  const { id, flightId } = await params;

  const flight = await getFlightServer(
    Number(flightId)
  );

  if (!flight) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Edit Flight
            </h1>

            <p className="mt-2 text-slate-500">
              Update your flight reservation.
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
          tripId={flight.tripId}
          defaultDepartureDate={
            flight.departureDateTime?.substring(0, 10) ?? ""
          }
          defaultArrivalDate={
            flight.arrivalDateTime?.substring(0, 10) ?? ""
          }
          flight={flight}
          isEditing={true}
        />
      </div>
    </main>
  );
}