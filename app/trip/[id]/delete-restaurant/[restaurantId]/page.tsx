import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  getRestaurant,
  deleteRestaurant,
} from "@/lib/restaurantService";

type Props = {
  params: Promise<{
    id: string;
    restaurantId: string;
  }>;
};

export default async function DeleteRestaurantPage({
  params,
}: Props) {
  const { id, restaurantId } = await params;

  const restaurant = await getRestaurant(
    Number(restaurantId)
  );

  if (!restaurant) {
    notFound();
  }

  async function deleteCurrentRestaurant() {
    "use server";

    await deleteRestaurant(restaurant.id);

    redirect(`/trip/${id}`);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-md">

        <h1 className="text-3xl font-bold text-red-600">
          Delete Restaurant
        </h1>

        <p className="mt-6 text-lg">
          Are you sure you want to delete this restaurant?
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

          <div className="text-xl font-semibold">
            🍽️ {restaurant.restaurantName}
          </div>

          {restaurant.address && (
            <div className="mt-2 text-slate-600">
              {restaurant.address}
            </div>
          )}

          {restaurant.reservationDate && (
            <div className="mt-2 text-sm text-slate-500">
              Reservation:{" "}
              {new Date(
                restaurant.reservationDate
              ).toLocaleDateString()}
            </div>
          )}

        </div>

        <form
          action={deleteCurrentRestaurant}
          className="mt-8"
        >

          <div className="flex justify-between">

            <Link
              href={`/trip/${id}`}
              className="rounded-xl bg-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-400"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Delete Restaurant
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}