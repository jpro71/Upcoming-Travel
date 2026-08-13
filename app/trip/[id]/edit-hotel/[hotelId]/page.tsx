import Link from "next/link";
import { notFound } from "next/navigation";

import { getHotelServer } from "@/lib/hotelServerService";

import HotelForm from "@/components/trip/HotelForm";

type Props = {
  params: Promise<{
    id: string;
    hotelId: string;
  }>;
};

export default async function EditHotelPage({
  params,
}: Props) {
  const { id, hotelId } = await params;

  const hotel = await getHotelServer(Number(hotelId));

  if (!hotel) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Edit Hotel
            </h1>

            <p className="mt-2 text-slate-500">
              Update your hotel reservation.
            </p>

          </div>

          <Link
            href={`/trip/${id}`}
            className="rounded-xl bg-slate-200 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </Link>

        </div>

        <HotelForm
          tripId={hotel.tripId}
          defaultCheckIn={hotel.checkIn ?? ""}
          defaultCheckOut={hotel.checkOut ?? ""}
          hotel={hotel}
          isEditing={true}
        />

      </div>

    </main>
  );
}