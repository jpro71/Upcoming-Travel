import Link from "next/link";
import { redirect } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TripCard from "@/components/TripCard";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { getTripsServer } from "@/lib/tripServerService";

export default async function MyTripsPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const trips = await getTripsServer();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.endDate) >= today
  );

  const pastTrips = trips.filter(
    (trip) => new Date(trip.endDate) < today
  );

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#B01E2D]">
                  Travel Library
                </p>

                <h1 className="mt-1 text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                  My Trips
                </h1>

                <p className="mt-2 text-slate-600">
                  View and manage all of your PortalPuffin trips.
                </p>
              </div>

              <Link
                href="/new-trip"
                className="inline-flex justify-center rounded-xl bg-[#B01E2D] px-5 py-3 font-semibold text-white transition hover:bg-[#8F1724]"
              >
                + Add Trip
              </Link>
            </div>

            {upcomingTrips.length > 0 && (
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">
                    Upcoming Trips
                  </h2>

                  <span className="text-sm font-semibold text-slate-500">
                    {upcomingTrips.length}{" "}
                    {upcomingTrips.length === 1 ? "trip" : "trips"}
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {upcomingTrips.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      returnTo="my-trips"
                    />
                  ))}
                </div>
              </section>
            )}

            {pastTrips.length > 0 && (
              <section className="mt-10">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">
                    Past Trips
                  </h2>

                  <span className="text-sm font-semibold text-slate-500">
                    {pastTrips.length}{" "}
                    {pastTrips.length === 1 ? "trip" : "trips"}
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {pastTrips.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      returnTo="my-trips"
                    />
                  ))}
                </div>
              </section>
            )}

            {trips.length === 0 && (
              <div className="rounded-2xl border border-[#E7DDCA] bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">
                  No trips yet
                </h2>

                <p className="mt-2 text-slate-600">
                  Create your first trip and start planning your next adventure.
                </p>

                <Link
                  href="/new-trip"
                  className="mt-6 inline-flex rounded-xl bg-[#B01E2D] px-5 py-3 font-semibold text-white transition hover:bg-[#8F1724]"
                >
                  + Add Your First Trip
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}