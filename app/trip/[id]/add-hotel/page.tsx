import Link from "next/link";
import { notFound } from "next/navigation";

import { getTripServer } from "@/lib/tripServerService";

import HotelForm from "@/components/trip/HotelForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AddHotelPage({
  params,
}: Props) {
  const { id } = await params;

  const trip = await getTripServer(Number(id));

  if (!trip) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Add Hotel
            </h1>

            <p className="mt-2 text-slate-500">
              Enter your hotel reservation details.
            </p>
          </div>

          <Link
            href={`/trip/${id}`}
            className="rounded-xl bg-slate-200 px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-300"
          >
            Cancel
          </Link>
        </div>

        <HotelForm
          tripId={trip.id}
          defaultCheckIn={trip.startDate}
          defaultCheckOut={trip.endDate}
        />
      </div>
    </main>
  );
}