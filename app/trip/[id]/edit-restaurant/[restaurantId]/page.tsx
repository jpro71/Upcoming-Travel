import Link from "next/link";
import { notFound } from "next/navigation";

import { getRestaurant } from "@/lib/restaurantService";
import RestaurantForm from "@/components/trip/RestaurantForm";

type Props = {
  params: Promise<{
    id: string;
    restaurantId: string;
  }>;
};

export default async function EditRestaurantPage({
  params,
}: Props) {
  const { id, restaurantId } = await params;

  const restaurant = await getRestaurant(
    Number(restaurantId)
  );

  if (!restaurant) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Edit Restaurant
            </h1>

            <p className="mt-2 text-slate-500">
              Update your restaurant reservation details.
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
          tripId={restaurant.tripId}
          defaultReservationDate={
            restaurant.reservationDate ?? ""
          }
          restaurant={restaurant}
          isEditing={true}
        />

      </div>

    </main>
  );
}