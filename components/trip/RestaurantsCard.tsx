import Link from "next/link";

import { getRestaurantsServer } from "@/lib/restaurantServerService";

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

export default async function RestaurantsCard({
  tripId,
}: Props) {
  const restaurants = await getRestaurantsServer(tripId);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Restaurants
          </h2>

          <p className="mt-1 text-slate-500">
            Restaurant reservations for this trip.
          </p>

        </div>

        <Link
          href={`/trip/${tripId}/add-restaurant`}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Restaurant
        </Link>

      </div>

      {restaurants.length === 0 ? (

        <div className="rounded-xl border-2 border-dashed border-slate-300 p-10 text-center">

          <p className="text-lg font-semibold text-slate-600">
            No restaurant reservations yet.
          </p>

          <p className="mt-2 text-slate-500">
            Add reservations so they're easy to find while traveling.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {restaurants.map((restaurant) => (

            <div
              key={restaurant.id}
              className="rounded-xl border border-slate-200 p-5"
            >

              <div className="flex items-start justify-between">

                <div>

                  <div className="text-lg font-semibold">
                    🍽️ {restaurant.restaurantName}
                  </div>

                  {restaurant.address && (
                    <div className="mt-1 text-slate-600">
                      {restaurant.address}
                    </div>
                  )}

                  <div className="mt-2 text-sm text-slate-500">

                    {restaurant.reservationDate ? (
                      formatDate(restaurant.reservationDate)
                    ) : (
                      "Reservation date not entered"
                    )}

                    {restaurant.reservationTime && (
                      <> • {restaurant.reservationTime}</>
                    )}

                  </div>

                  {restaurant.confirmationNumber && (

                    <div className="mt-2 text-sm text-slate-500">
                      Confirmation: {restaurant.confirmationNumber}
                    </div>

                  )}

                </div>

                <div className="flex gap-2">

                  <Link
                    href={`/trip/${tripId}/edit-restaurant/${restaurant.id}`}
                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                  >
                    Edit
                  </Link>

                  <Link
                    href={`/trip/${tripId}/delete-restaurant/${restaurant.id}`}
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