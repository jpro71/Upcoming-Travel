import { notFound } from "next/navigation";

import { getTrip } from "@/lib/tripService";

import TripHeader from "@/components/trip/TripHeader";
import TripOverviewForm from "@/components/trip/TripOverviewForm";
import TripNotes from "@/components/trip/TripNotes";
import FlightsCard from "@/components/trip/FlightsCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TripDetailsPage({ params }: Props) {
  const { id } = await params;

  const trip = await getTrip(Number(id));

  if (!trip) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl">

        <TripHeader trip={trip} />

        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          <TripOverviewForm trip={trip} />

          <TripNotes trip={trip} />

        </div>

        <div className="mt-8">

          <FlightsCard tripId={trip.id} />

        </div>

      </div>
    </main>
  );
}