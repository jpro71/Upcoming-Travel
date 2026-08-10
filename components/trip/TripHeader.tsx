import Link from "next/link";
import { Trip } from "@/types/trip";

type TripHeaderProps = {
  trip: Trip;
};

export default function TripHeader({
  trip,
}: TripHeaderProps) {
  return (
    <>
      <div
        className="h-3 w-full rounded-t-2xl"
        style={{
          backgroundColor: trip.color || "#2563EB",
        }}
      />

      <div className="flex items-center justify-between bg-white px-6 py-5">
        <Link
          href="/dashboard"
          className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
        >
          ← Back to Dashboard
        </Link>

        <div className="text-sm text-slate-500">
          {trip.status}
        </div>
      </div>
    </>
  );
}