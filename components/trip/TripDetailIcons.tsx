"use client";

type PlannerItem =
  | "flights"
  | "rentalCar"
  | "hotel"
  | "restaurants"
  | "documents";

type Props = {
  enabledItems: PlannerItem[];
};

const itemDetails: Record<
  PlannerItem,
  {
    label: string;
    icon: string;
    sectionId: string;
  }
> = {
  flights: {
    label: "Flights",
    icon: "✈️",
    sectionId: "flights",
  },
  rentalCar: {
    label: "Rental Car",
    icon: "🚗",
    sectionId: "rental-cars",
  },
  hotel: {
    label: "Hotel",
    icon: "🏨",
    sectionId: "hotels",
  },
  restaurants: {
    label: "Restaurants",
    icon: "🍽️",
    sectionId: "restaurants",
  },
  documents: {
    label: "Documents",
    icon: "📄",
    sectionId: "documents",
  },
};

export default function TripDetailIcons({
  enabledItems,
}: Props) {
  if (enabledItems.length === 0) {
    return null;
  }

  function scrollToSection(sectionId: string) {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <nav
      aria-label="Trip details"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {enabledItems.map((item) => {
        const details = itemDetails[item];

        return (
          <button
            key={item}
            type="button"
            title={details.label}
            aria-label={`Go to ${details.label}`}
            onClick={() =>
              scrollToSection(details.sectionId)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DDCA] bg-[#FFF9EE] text-xl shadow-sm transition hover:border-[#D4AF37] hover:bg-[#F5E9D2] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            {details.icon}
          </button>
        );
      })}
    </nav>
  );
}