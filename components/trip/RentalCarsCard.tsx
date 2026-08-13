import Link from "next/link";

import { getRentalCarsServer } from "@/lib/rentalCarServerService";

type Props = {
  tripId: number;
};

function formatDateTime(date?: string) {
  if (!date) return "";

  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatCurrency(amount?: number) {
  if (amount === undefined) return "";

  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export default async function RentalCarsCard({
  tripId,
}: Props) {
  const rentalCars = await getRentalCarsServer(tripId);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Rental Cars
          </h2>

          <p className="mt-1 text-slate-500">
            Rental car reservations for this trip.
          </p>
        </div>

        <Link
          href={`/trip/${tripId}/add-rental-car`}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Rental Car
        </Link>
      </div>

      {rentalCars.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-10 text-center">
          <p className="text-lg font-semibold text-slate-600">
            No rental cars added yet.
          </p>

          <p className="mt-2 text-slate-500">
            Add your rental car reservation for quick access
            while traveling.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {rentalCars.map((rentalCar) => (
            <div
              key={rentalCar.id}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-lg font-semibold">
                    🚗 {rentalCar.rentalCompany}
                  </div>

                  {rentalCar.vehicleType && (
                    <div className="mt-1 text-slate-600">
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

                  {rentalCar.pickupAt && (
                    <div className="mt-1 text-sm text-slate-500">
                      {formatDateTime(rentalCar.pickupAt)}
                    </div>
                  )}

                  {rentalCar.dropoffLocation && (
                    <div className="mt-3 text-sm text-slate-600">
                      <span className="font-semibold">
                        Return:
                      </span>{" "}
                      {rentalCar.dropoffLocation}
                    </div>
                  )}

                  {rentalCar.dropoffAt && (
                    <div className="mt-1 text-sm text-slate-500">
                      {formatDateTime(rentalCar.dropoffAt)}
                    </div>
                  )}

                  {rentalCar.confirmationNumber && (
                    <div className="mt-3 text-sm text-slate-500">
                      Confirmation:{" "}
                      {rentalCar.confirmationNumber}
                    </div>
                  )}

                  {rentalCar.totalCost !== undefined && (
                    <div className="mt-2 text-sm font-semibold text-slate-700">
                      Total:{" "}
                      {formatCurrency(rentalCar.totalCost)}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/trip/${tripId}/edit-rental-car/${rentalCar.id}`}
                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                  >
                    Edit
                  </Link>

                  <Link
                    href={`/trip/${tripId}/delete-rental-car/${rentalCar.id}`}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}