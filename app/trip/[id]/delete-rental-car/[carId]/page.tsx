import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  getRentalCar,
  deleteRentalCar,
} from "@/lib/rentalCarService";

type Props = {
  params: Promise<{
    id: string;
    carId: string;
  }>;
};

export default async function DeleteRentalCarPage({
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

  const rentalCar = await getRentalCar(rentalCarId);

  if (!rentalCar) {
    notFound();
  }

  if (rentalCar.tripId !== tripId) {
    notFound();
  }

  const rentalCarIdToDelete = rentalCar.id;
  const returnTripId = tripId;

  async function deleteCurrentRentalCar() {
    "use server";

    await deleteRentalCar(rentalCarIdToDelete);

    redirect(`/trip/${returnTripId}`);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-4xl font-bold">
          Delete Rental Car
        </h1>

        <p className="mt-6 text-lg">
          Are you sure you want to delete this rental car
          reservation?
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xl font-semibold">
            🚗 {rentalCar.rentalCompany}
          </div>

          {rentalCar.vehicleType && (
            <div className="mt-2 text-slate-600">
              {rentalCar.vehicleType}
            </div>
          )}

          {rentalCar.pickupLocation && (
            <div className="mt-3 text-sm text-slate-600">
              <span className="font-semibold">
                Pickup:
              </span>{" "}
              {rentalCar.pickupLocation}
            </div>
          )}

          {rentalCar.confirmationNumber && (
            <div className="mt-2 text-sm text-slate-500">
              Confirmation:{" "}
              {rentalCar.confirmationNumber}
            </div>
          )}
        </div>

        <form
          action={deleteCurrentRentalCar}
          className="mt-8"
        >
          <div className="flex justify-between">
            <Link
              href={`/trip/${returnTripId}`}
              className="rounded-xl bg-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-400"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-[#B01E2D] px-6 py-3 font-semibold text-white hover:bg-[#8F1724]"
            >
              Delete Rental Car
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}