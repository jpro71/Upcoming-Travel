import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  getHotelServer,
  deleteHotelServer,
} from "@/lib/hotelServerService";

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

  const hotel = await getHotelServer(Number(hotelId));

  if (!hotel) {
    notFound();
  }

  const hotelIdToDelete = hotel.id;

  async function deleteCurrentHotel() {
    "use server";

    await deleteHotelServer(hotelIdToDelete);

    redirect(`/trip/${id}`);
  }

  return (
    <main className="min-h-screen bg-[#FBF7EF] p-8">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-[#B01E2D]">
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
              className="rounded-xl bg-[#B01E2D] px-6 py-3 font-semibold text-white hover:bg-[#8F1724]"
            >
              Delete Hotel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}