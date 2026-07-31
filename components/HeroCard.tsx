import { trips } from "@/data/trips";
import { formatDateRange, daysUntil } from "@/lib/dateUtils";

export default function HeroCard() {
  const sortedTrips = [...trips].sort(
    (a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const trip = sortedTrips[0];
  const countdown = daysUntil(trip.startDate);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <img
        src={trip.image || "/images/norwegian-prima.jpg"}
        alt={trip.title}
        className="h-72 w-full object-cover"
      />

      <div className="p-8">
        <div className="text-sm uppercase tracking-widest text-slate-500">
          Next Adventure
        </div>

        <h2 className="mt-3 text-5xl font-bold">
          {trip.title}
        </h2>

        <p className="mt-3 text-xl text-slate-600">
          {trip.destination}
        </p>

        <p className="mt-2 text-lg text-slate-500">
          {formatDateRange(trip.startDate, trip.endDate)}
        </p>

        <div className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-white text-xl font-semibold">
          {countdown} Days Remaining
        </div>
      </div>
    </div>
  );
}