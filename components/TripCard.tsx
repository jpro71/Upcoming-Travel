import Link from "next/link";

import { Trip } from "@/types/trip";
import { formatDateRange } from "@/lib/dateUtils";
import TripDetailBadges from "@/components/dashboard/TripDetailBadges";

type TripCardProps = {
  trip: Trip;
  returnTo?: "dashboard" | "my-trips";
};

export default function TripCard({
  trip,
  returnTo = "dashboard",
}: TripCardProps) {
  const tripHref =
    returnTo === "my-trips"
      ? `/trip/${trip.id}?from=my-trips`
      : `/trip/${trip.id}`;

  return (
    <Link
      href={tripHref}
      className="group block overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative">
        <img
          src={trip.image || "/images/default-trip.jpg"}
          alt={trip.title}
          className="h-[clamp(110px,14vh,150px)] w-full object-cover"
        />

        <div className="absolute left-3 top-3 rounded-full bg-[#B01E2D] px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {trip.type}
        </div>
      </div>

      <div className="p-3 xl:p-4">
        <h3 className="text-xl font-bold text-[#1A1A1A] transition group-hover:text-[#B01E2D]">
          {trip.title}
        </h3>

        <div className="mt-1 text-sm text-[#6B6B6B]">
          ⌖ {trip.destination}
        </div>

        <div className="mt-1 text-sm text-[#6B6B6B]">
          ▣ {formatDateRange(trip.startDate, trip.endDate)}
        </div>

        <div className="mt-3 border-t border-[#E7DDCA] pt-2">
          <TripDetailBadges
            plannerItems={trip.plannerItems}
          />
        </div>
      </div>
    </Link>
  );
}