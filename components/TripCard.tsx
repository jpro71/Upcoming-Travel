import Link from "next/link";
import { formatDateRange, daysUntil, tripStatus } from "@/lib/dateUtils";
import { Trip } from "@/types/trip";

export default function TripCard({ trip }: { trip: Trip }) {
  const countdown = daysUntil(trip.startDate);
  const status = tripStatus(trip.startDate, trip.endDate);

  const statusStyle =
    status === "Upcoming"
      ? "bg-[#F5E9D2] text-[#B01E2D]"
      : status === "Traveling"
      ? "bg-green-100 text-green-700"
      : "bg-slate-200 text-slate-700";

  return (
    <Link href={`/trip/${trip.id}`}>
      <div className="cursor-pointer overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <img
          src={trip.image || "/images/norwegian-prima.jpg"}
          alt={trip.title}
          className="h-28 w-full object-cover"
        />

        <div className="p-4">
          <div className="text-xs font-semibold text-[#B01E2D]">{trip.type}</div>

          <h3 className="mt-1 text-xl font-bold text-[#1A1A1A]">
            {trip.title}
          </h3>

          <p className="mt-1 text-sm text-[#6B6B6B]">⌖ {trip.destination}</p>

          <p className="mt-2 text-sm text-[#6B6B6B]">
            ▣ {formatDateRange(trip.startDate, trip.endDate)}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${statusStyle}`}>
              {status}
            </span>

            <span className="text-sm font-bold text-[#B01E2D]">
              {countdown} Days
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
