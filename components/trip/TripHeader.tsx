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
};

export default function TripHeader({
  trip,
  enabledItems = [],
}: Props) {
  return (
    <div className="rounded-t-xl border-t-[10px] border-[#B01E2D] bg-white px-5 py-4 shadow-md">
      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex justify-start">
          <Link
            href="/dashboard"
            className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
          >
            ← Back to Dashboard
          </Link>
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