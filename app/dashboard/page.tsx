export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HeroCard from "@/components/HeroCard";
import TripCard from "@/components/TripCard";

import { getTripsServer } from "@/lib/tripServerService";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const trips = await getTripsServer();

  const sortedTrips = [...trips].sort(
    (a, b) =>
      new Date(a.startDate).getTime() -
      new Date(b.startDate).getTime()
  );

  const nextTrip = sortedTrips[0];

  return (
    <main className="min-h-screen bg-slate-100">
      <Header />

      <div className="flex">
        <Sidebar />

        <div className="min-w-0 flex-1 space-y-8 p-4 sm:p-6 lg:p-8">
          <HeroCard trip={nextTrip} />

          <section id="upcoming-trips">
            <h2 className="mb-4 text-2xl font-bold">
              Upcoming Trips
            </h2>

            {sortedTrips.length === 0 ? (
              <div className="rounded-xl bg-white p-8 text-center shadow sm:p-10">
                <h3 className="text-2xl font-semibold text-slate-700">
                  No trips yet
                </h3>

                <p className="mt-3 text-slate-500">
                  Click <strong>Add Trip</strong> to create your first trip.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                {sortedTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}