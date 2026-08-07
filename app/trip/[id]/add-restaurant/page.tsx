import Link from "next/link";
import { notFound } from "next/navigation";

import { getTrip } from "@/lib/tripService";

import RestaurantForm from "@/components/trip/RestaurantForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AddRestaurantPage({
  params,
}: Props) {
  const { id } = await params;

  const trip = await getTrip(Number(id));

  if (!trip) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Add Restaurant
            </h1>

            <p className="mt-2 text-slate-500">
              Enter your restaurant reservation details.
            </p>

          </div>

          <Link
            href={`/trip/${id}`}
            className="rounded-xl bg-slate-200 px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-300"
          >
            Cancel
          </Link>

        </div>

        <RestaurantForm
          tripId={trip.id}
          defaultReservationDate={trip.startDate}
        />

      </div>

    </main>
  );
}