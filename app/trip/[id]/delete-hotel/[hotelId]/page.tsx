import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getHotel, deleteHotel } from "@/lib/hotelService";

type Props = {
  params: Promise<{
    id: string;
    hotelId: string;
  }>;
};

export default async function DeleteHotelPage({
  params,
}: Props) {
  const { id, hotelId } = await params;

  const hotel = await getHotel(Number(hotelId));

  if (!hotel) {
    notFound();
  }

  async function deleteCurrentHotel() {
    "use server";

    await deleteHotel(hotel.id);

    redirect(`/trip/${id}`);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-md">

        <h1 className="text-3xl font-bold text-red-600">
          Delete Hotel
        </h1>

        <p className="mt-6 text-lg">
          Are you sure you want to delete this hotel?
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

          <div className="text-xl font-semibold">
            🏨 {hotel.hotelName}
          </div>

          {hotel.address && (
            <div className="mt-2 text-slate-600">
              {hotel.address}
            </div>
          )}

        </div>

        <form action={deleteCurrentHotel} className="mt-8">

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
              Delete Hotel
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}