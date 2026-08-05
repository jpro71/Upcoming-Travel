import Link from "next/link";
import { formatDateRange, daysUntil, tripStatus } from "@/lib/dateUtils";
import { Trip } from "@/types/trip";

export default function TripCard({ trip }: { trip: Trip }) {
  const countdown = daysUntil(trip.startDate);
  const status = tripStatus(trip.startDate, trip.endDate);

  const statusStyle =
    status === "Upcoming"
      ? "bg-blue-100 text-blue-700"
      : status === "Traveling"
      ? "bg-green-100 text-green-700"
      : "bg-slate-200 text-slate-700";

  return (
    <Link href={`/trip/${trip.id}`}>
      <div className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl">

        <img
          src={trip.image || "/images/norwegian-prima.jpg"}
          alt={trip.title}
          className="h-36 w-full object-cover"
        />

        <div className="p-5">

          <div className="text-sm text-slate-500">
            {trip.type}
          </div>

          <h3 className="mt-2 text-2xl font-bold">
            {trip.title}
          </h3>

          <p className="mt-1 text-slate-600">
            {trip.destination}
          </p>

          <p className="mt-3 text-slate-500">
            {formatDateRange(trip.startDate, trip.endDate)}
          </p>

          <div className="mt-5 flex items-center justify-between">

            <span className={`rounded-lg px-3 py-2 text-sm font-semibold ${statusStyle}`}>
              {status}
            </span>

            <span className="font-bold text-blue-600">
              {countdown} Days
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
}