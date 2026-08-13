type PlannerItem =
  | "flights"
  | "rentalCar"
  | "hotel"
  | "restaurants"
  | "documents";

type PlannerItems = Partial<Record<PlannerItem, boolean>>;

type Props = {
  plannerItems?: PlannerItems | null;
};

const itemDetails: {
  key: PlannerItem;
  label: string;
  icon: string;
}[] = [
  {
    key: "flights",
    label: "Flights",
    icon: "✈️",
  },
  {
    key: "rentalCar",
    label: "Rental Car",
    icon: "🚗",
  },
  {
    key: "hotel",
    label: "Hotel",
    icon: "🏨",
  },
  {
    key: "restaurants",
    label: "Restaurants",
    icon: "🍽️",
  },
  {
    key: "documents",
    label: "Documents",
    icon: "📄",
  },
];

export default function TripDetailBadges({
  plannerItems,
}: Props) {
  const enabledItems = itemDetails.filter(
    (item) => plannerItems?.[item.key]
  );

  if (enabledItems.length === 0) {
    return null;
  }

  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      aria-label="Trip details"
    >
      {enabledItems.map((item) => (
        <span
          key={item.key}
          title={item.label}
          aria-label={item.label}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E7DDCA] bg-[#FFF9EE] text-sm shadow-sm"
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}