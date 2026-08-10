import { notFound } from "next/navigation";
import { getTrip } from "@/lib/tripService";

import TripHeader from "@/components/trip/TripHeader";
import TripOverviewForm from "@/components/trip/TripOverviewForm";
import TripNotes from "@/components/trip/TripNotes";
import FlightsCard from "@/components/trip/FlightsCard";
import RentalCarsCard from "@/components/trip/RentalCarsCard";
import HotelsCard from "@/components/trip/HotelsCard";
import RestaurantsCard from "@/components/trip/RestaurantsCard";
import DocumentsCard from "@/components/trip/DocumentsCard";
import CoverPhotoEditor from "@/components/trip/CoverPhotoEditor";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

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

export default async function TripDetailsPage({ params }: Props) {
  const { id } = await params;

  const trip = await getTrip(Number(id));

  if (!trip) {
    notFound();
  }

  const plannerItems = trip.plannerItems;

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
        <TripHeader trip={trip} />

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

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <TripOverviewForm trip={trip} />
          <TripNotes trip={trip} />
        </div>

        {plannerItems?.flights && (
          <div className="mt-8">
            <FlightsCard tripId={trip.id} />
          </div>
        )}

        {plannerItems?.rentalCar && (
          <div className="mt-8">
            <RentalCarsCard tripId={trip.id} />
          </div>
        )}

        {plannerItems?.hotel && (
          <div className="mt-8">
            <HotelsCard tripId={trip.id} />
          </div>
        )}

        {plannerItems?.restaurants && (
          <div className="mt-8">
            <RestaurantsCard tripId={trip.id} />
          </div>
        )}

        {plannerItems?.documents && (
          <div className="mt-8">
            <DocumentsCard tripId={trip.id} />
          </div>
        )}
      </div>
    </main>
  );
}