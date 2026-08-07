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
    <main className="min-h-screen bg-[#FBF7EF]">
      <Header />

      <div className="flex">
        <Sidebar />

        <div className="min-w-0 flex-1 space-y-4 p-5">
          <HeroCard trip={nextTrip} />

          <section>
            <h2 className="mb-3 border-l-4 border-[#D4AF37] pl-3 text-xl font-bold text-[#1A1A1A]">
              Upcoming Trips
            </h2>

            {sortedTrips.length === 0 ? (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-[#1A1A1A]">
                  No trips yet
                </h3>
                <p className="mt-2 text-sm text-[#6B6B6B]">
                  Click <strong>Add Trip</strong> to create your first trip.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {sortedTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
