"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type PlannerItem =
  | "flights"
  | "rentalCar"
  | "hotel"
  | "restaurants"
  | "documents";

type Props = {
  tripId: number;
  availableItems: PlannerItem[];
};

const itemDetails: Record<
  PlannerItem,
  { label: string; icon: string }
> = {
  flights: {
    label: "Flights",
    icon: "✈️",
  },
  rentalCar: {
    label: "Rental Car",
    icon: "🚗",
  },
  hotel: {
    label: "Hotel",
    icon: "🏨",
  },
  restaurants: {
    label: "Restaurants",
    icon: "🍽️",
  },
  documents: {
    label: "Documents",
    icon: "📄",
  },
};

export default function AddToTrip({
  tripId,
  availableItems,
}: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  if (availableItems.length === 0) {
    return null;
  }

  async function addItem(item: PlannerItem) {
    setError("");

    startTransition(async () => {
      try {
        const response = await fetch(
          `/api/trips/${tripId}/planner-items`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ item }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Unable to add trip details."
          );
        }

        setIsOpen(false);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to add trip details."
        );
      }
    });
  }

  return (
    <div className="rounded-2xl border border-[#E7DDCA] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1A1A1A]">
            Add Trip Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add flights, rental cars, hotels, restaurants, or
            documents to this trip.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-xl bg-[#B01E2D] px-5 py-3 font-semibold text-white transition hover:bg-[#8F1724]"
        >
          {isOpen ? "Close" : "+ Add Trip Details"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 border-t border-[#E7DDCA] pt-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availableItems.map((item) => {
              const details = itemDetails[item];

              return (
                <button
                  key={item}
                  type="button"
                  disabled={isPending}
                  onClick={() => addItem(item)}
                  className="flex items-center gap-3 rounded-xl border-2 border-[#E7DDCA] bg-white p-4 text-left font-semibold text-[#1A1A1A] transition hover:border-[#D4AF37] hover:bg-[#FFF9EE] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="text-2xl">
                    {details.icon}
                  </span>

                  <span>
                    {`Add ${details.label}`}
                  </span>
                </button>
              );
            })}
          </div>

          {error && (
            <p className="mt-4 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}