import { notFound, redirect } from "next/navigation";

import { getTripServer } from "@/lib/tripServerService";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

import TripHeader from "@/components/trip/TripHeader";
import TripOverviewForm from "@/components/trip/TripOverviewForm";
import TripNotes from "@/components/trip/TripNotes";
import FlightsCard from "@/components/trip/FlightsCard";
import RentalCarsCard from "@/components/trip/RentalCarsCard";
import HotelsCard from "@/components/trip/HotelsCard";
import RestaurantsCard from "@/components/trip/RestaurantsCard";
import DocumentsCard from "@/components/trip/DocumentsCard";
import CoverPhotoEditor from "@/components/trip/CoverPhotoEditor";
import AddToTrip from "@/components/trip/AddToTrip";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
};

type PlannerItem =
  | "flights"
  | "rentalCar"
  | "hotel"
  | "restaurants"
  | "documents";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getTripLength(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff =
    Math.round(
      (endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  return `${diff} Day${diff === 1 ? "" : "s"}`;
}

export default async function TripDetailsPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { from } = await searchParams;

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const trip = await getTripServer(Number(id));

  if (!trip) {
    notFound();
  }

  const plannerItems = trip.plannerItems;

  const enabledItems: PlannerItem[] = [];
  const availableItems: PlannerItem[] = [];

  if (plannerItems?.flights) {
    enabledItems.push("flights");
  } else {
    availableItems.push("flights");
  }

  if (plannerItems?.rentalCar) {
    enabledItems.push("rentalCar");
  } else {
    availableItems.push("rentalCar");
  }

  if (plannerItems?.hotel) {
    enabledItems.push("hotel");
  } else {
    availableItems.push("hotel");
  }

  if (plannerItems?.restaurants) {
    enabledItems.push("restaurants");
  } else {
    availableItems.push("restaurants");
  }

  if (plannerItems?.documents) {
    enabledItems.push("documents");
  } else {
    availableItems.push("documents");
  }

  const returnTo =
    from === "my-trips" ? "my-trips" : "dashboard";

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="relative h-[430px] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute right-8 top-8 z-20">
          <CoverPhotoEditor tripId={trip.id} />
        </div>

        <div className="absolute bottom-10 left-10 text-white">
          <div className="mb-3 inline-flex rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold">
            {trip.type}
          </div>

          <h1 className="text-5xl font-bold">
            {trip.title}
          </h1>

          <div className="mt-2 text-2xl">
            📍 {trip.destination}
          </div>

          <div className="mt-2 text-lg text-slate-200">
            {formatDate(trip.startDate)} –{" "}
            {formatDate(trip.endDate)}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-10 pb-10">
        <TripHeader
          trip={trip}
          enabledItems={enabledItems}
          returnTo={returnTo}
        />

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <div className="text-sm text-slate-500">
                Destination
              </div>

              <div className="mt-1 text-lg font-semibold">
                📍 {trip.destination}
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-500">
                Dates
              </div>

              <div className="mt-1 font-semibold">
                {formatDate(trip.startDate)}
              </div>

              <div className="font-semibold">
                {formatDate(trip.endDate)}
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-500">
                Duration
              </div>

              <div className="mt-1 font-semibold">
                {getTripLength(
                  trip.startDate,
                  trip.endDate
                )}
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-500">
                Status
              </div>

              <div className="mt-1">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  {trip.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AddToTrip
            tripId={trip.id}
            availableItems={availableItems}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <TripOverviewForm trip={trip} />
          <TripNotes trip={trip} />
        </div>

        {plannerItems?.flights && (
          <div id="flights" className="mt-8 scroll-mt-6">
            <FlightsCard tripId={trip.id} />
          </div>
        )}

        {plannerItems?.rentalCar && (
          <div
            id="rental-cars"
            className="mt-8 scroll-mt-6"
          >
            <RentalCarsCard tripId={trip.id} />
          </div>
        )}

        {plannerItems?.hotel && (
          <div id="hotels" className="mt-8 scroll-mt-6">
            <HotelsCard tripId={trip.id} />
          </div>
        )}

        {plannerItems?.restaurants && (
          <div
            id="restaurants"
            className="mt-8 scroll-mt-6"
          >
            <RestaurantsCard tripId={trip.id} />
          </div>
        )}

        {plannerItems?.documents && (
          <div
            id="documents"
            className="mt-8 scroll-mt-6"
          >
            <DocumentsCard tripId={trip.id} />
          </div>
        )}
      </div>
    </main>
  );
}