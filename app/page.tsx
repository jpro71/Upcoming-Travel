import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HeroCard from "@/components/HeroCard";
import TripCard from "@/components/TripCard";
import { trips } from "@/data/trips";

export default function Home() {
  return (
    <main className="bg-slate-100 min-h-screen">
      <Header />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 space-y-8">
          <HeroCard />

          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Upcoming Trips
            </h2>

            <div className="grid grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}