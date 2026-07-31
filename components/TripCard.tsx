type Trip = {
  title: string;
  type: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: string;
};

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="rounded-xl bg-white shadow-md p-6 hover:shadow-lg transition">
      <div className="text-sm text-slate-500">
        {trip.type}
      </div>

      <h3 className="mt-2 text-2xl font-bold">
        {trip.title}
      </h3>

      <p className="mt-2 text-slate-600">
        {trip.destination}
      </p>

      <p className="mt-1 text-slate-500">
        {trip.startDate} - {trip.endDate}
      </p>

      <div className="mt-6 inline-block rounded-lg bg-green-100 px-3 py-2 font-semibold text-green-700">
        {trip.status}
      </div>
    </div>
  );
}