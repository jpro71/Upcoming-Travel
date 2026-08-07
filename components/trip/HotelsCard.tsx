import Link from "next/link";

import { getHotels } from "@/lib/hotelService";

type Props = {
  tripId: number;
};

function formatDate(date?: string) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function HotelsCard({
  tripId,
}: Props) {
  const hotels = await getHotels(tripId);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Hotels
          </h2>

          <p className="mt-1 text-slate-500">
            Hotel reservations for this trip.
          </p>

        </div>

        <Link
          href={`/trip/${tripId}/add-hotel`}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Hotel
        </Link>

      </div>

      {hotels.length === 0 ? (

        <div className="rounded-xl border-2 border-dashed border-slate-300 p-10 text-center">

          <p className="text-lg font-semibold text-slate-600">
            No hotels added yet.
          </p>

          <p className="mt-2 text-slate-500">
            Add your hotel reservations for quick access while traveling.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {hotels.map((hotel) => (

            <div
              key={hotel.id}
              className="rounded-xl border border-slate-200 p-5"
            >

              <div className="flex items-start justify-between">

                <div>

                  <div className="text-lg font-semibold">
                    🏨 {hotel.hotelName}
                  </div>

                  {hotel.address && (
                    <div className="mt-1 text-slate-600">
                      {hotel.address}
                    </div>
                  )}

                  <div className="mt-2 text-sm text-slate-500">

                    {hotel.checkIn && hotel.checkOut ? (
                      <>
                        {formatDate(hotel.checkIn)} –{" "}
                        {formatDate(hotel.checkOut)}
                      </>
                    ) : (
                      "Dates not entered"
                    )}

                  </div>

                  {hotel.confirmationNumber && (

                    <div className="mt-2 text-sm text-slate-500">
                      Confirmation: {hotel.confirmationNumber}
                    </div>

                  )}

                </div>

                <div className="flex gap-2">

                  <Link
                    href={`/trip/${tripId}/edit-hotel/${hotel.id}`}
                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                  >
                    Edit
                  </Link>

                  <Link
                    href={`/trip/${tripId}/delete-hotel/${hotel.id}`}
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