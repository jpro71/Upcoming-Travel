import Link from "next/link";

import TripDetailIcons from "@/components/trip/TripDetailIcons";
import { Trip } from "@/types/trip";

type PlannerItem =
  | "flights"
  | "rentalCar"
  | "hotel"
  | "restaurants"
  | "documents";

type Props = {
  trip: Trip;
  enabledItems?: PlannerItem[];
  returnTo?: "dashboard" | "my-trips";
};

export default function TripHeader({
  trip,
  enabledItems = [],
  returnTo = "dashboard",
}: Props) {
  const cameFromMyTrips = returnTo === "my-trips";

  return (
    <div className="rounded-t-xl border-t-[10px] border-[#B01E2D] bg-white px-5 py-4 shadow-md">
      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-wrap items-center gap-2">
          {cameFromMyTrips ? (
            <>
              <Link
                href="/my-trips"
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
              >
                ← Back to My Trips
              </Link>

              <Link
                href="/dashboard"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
            >
              ← Back to Dashboard
            </Link>
          )}
        </div>

        <div className="flex justify-center">
          <TripDetailIcons enabledItems={enabledItems} />
        </div>

        <div className="text-center text-sm text-slate-500 md:text-right">
          {trip.status || "Planning"}
        </div>
      </div>
    </div>
  );
}