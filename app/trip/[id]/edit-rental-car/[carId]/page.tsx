import Link from "next/link";
import { notFound } from "next/navigation";

import { getTripServer } from "@/lib/tripServerService";
import { getRentalCarServer } from "@/lib/rentalCarServerService";

import RentalCarForm from "@/components/trip/RentalCarForm";

type Props = {
  params: Promise<{
    id: string;
    carId: string;
  }>;
};

export default async function EditRentalCarPage({
  params,
}: Props) {
  const { id, carId } = await params;

  const tripId = Number(id);
  const rentalCarId = Number(carId);

  if (
    !Number.isFinite(tripId) ||
    !Number.isFinite(rentalCarId)
  ) {
    notFound();
  }

  const [trip, rentalCar] = await Promise.all([
    getTripServer(tripId),
    getRentalCarServer(rentalCarId),
  ]);

  if (!trip || !rentalCar) {
    notFound();
  }

  if (rentalCar.tripId !== trip.id) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Edit Rental Car
            </h1>

            <p className="mt-2 text-slate-500">
              Update your rental car reservation details.
            </p>
          </div>

          <Link
            href={`/trip/${trip.id}`}
            className="rounded-xl bg-slate-200 px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-300"
          >
            Cancel
          </Link>
        </div>

        <RentalCarForm
          tripId={trip.id}
          rentalCar={rentalCar}
          defaultPickupDate={trip.startDate}
          defaultDropoffDate={trip.endDate}
        />
      </div>
    </main>
  );
}