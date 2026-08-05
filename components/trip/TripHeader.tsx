import Link from "next/link";
import { Trip } from "@/types/trip";

type TripHeaderProps = {
  trip: Trip;
};

export default function TripHeader({ trip }: TripHeaderProps) {
  return (
    <>
      <div
        className="h-3 w-full"
        style={{
          backgroundColor: trip.color || "#2563EB",
        }}
      />

      <div className="p-6 pb-0">
        <Link
          href="/"
          className="inline-block rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <img
        src={trip.image || "/images/default-trip.jpg"}
        alt={trip.title}
        className="h-80 w-full object-cover"
      />
    </>
  );
}