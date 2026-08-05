import { Trip } from "@/types/trip";
import { formatDateRange, daysUntil } from "@/lib/dateUtils";

type HeroCardProps = {
  trip?: Trip;
};

export default function HeroCard({ trip }: HeroCardProps) {
  if (!trip) {
    return (
      <div className="rounded-2xl bg-white p-12 shadow-lg">
        <h2 className="text-4xl font-bold">
          Plan Your Next Adventure
        </h2>

        <p className="mt-4 text-xl text-slate-600">
          You haven't created any trips yet.
        </p>

        <p className="mt-2 text-slate-500">
          Click <strong>Add Trip</strong> to start planning your next journey.
        </p>
      </div>
    );
  }

  const countdown = daysUntil(trip.startDate);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <img
        src={trip.image || "/images/default-trip.jpg"}
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

        <div className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-xl font-semibold text-white">
          {countdown} Days Remaining
        </div>

      </div>
    </div>
  );
}