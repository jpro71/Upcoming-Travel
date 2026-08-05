import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HeroCard from "@/components/HeroCard";
import TripCard from "@/components/TripCard";
import { getTrips } from "@/lib/tripService";

export default async function Home() {
  const trips = await getTrips();

  const sortedTrips = [...trips].sort(
    (a, b) =>
      new Date(a.startDate).getTime() -
      new Date(b.startDate).getTime()
  );

  const nextTrip = sortedTrips[0];

  return (
    <main className="bg-slate-100 min-h-screen">
      <Header />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 space-y-8">

          <HeroCard trip={nextTrip} />

          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Upcoming Trips
            </h2>

            {sortedTrips.length === 0 ? (
              <div className="rounded-xl bg-white p-10 text-center shadow">
                <h3 className="text-2xl font-semibold text-slate-700">
                  No trips yet
                </h3>

                <p className="mt-3 text-slate-500">
                  Click <strong>Add Trip</strong> to create your first trip.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {sortedTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}