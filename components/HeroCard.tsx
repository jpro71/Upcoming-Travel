import { Trip } from "@/types/trip";
import { formatDateRange, daysUntil } from "@/lib/dateUtils";
import TripDetailBadges from "@/components/dashboard/TripDetailBadges";

type HeroCardProps = {
  trip?: Trip;
};

export default function HeroCard({ trip }: HeroCardProps) {
  if (!trip) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="text-3xl font-bold text-[#1A1A1A]">
          Plan Your Next Adventure
        </h2>

        <p className="mt-2 text-sm text-[#6B6B6B]">
          Click <strong>Add Trip</strong> to start planning.
        </p>
      </div>
    );
  }

  const countdown = daysUntil(trip.startDate);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <img
        src={trip.image || "/images/default-trip.jpg"}
        alt={trip.title}
        className="h-[180px] w-full object-cover"
      />

      <div className="p-5">
        <div className="text-xs uppercase tracking-[0.14em] text-[#6B6B6B]">
          Next Adventure
        </div>

        <h2 className="mt-1 text-3xl font-bold text-[#1A1A1A]">
          {trip.title}
        </h2>

        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[#6B6B6B]">
          <span>⌖ {trip.destination}</span>
          <span className="text-[#D4AF37]">|</span>
          <span>
            ▣ {formatDateRange(trip.startDate, trip.endDate)}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-lg bg-[#B01E2D] px-4 py-2 text-sm font-bold text-white shadow-sm">
            {countdown} Days Remaining
          </div>

          <TripDetailBadges
            plannerItems={trip.plannerItems}
          />
        </div>
      </div>
    </div>
  );
}