import Link from "next/link";
import { getAirportLocationLabels } from "@/lib/flightService";
import { getFlightsServer } from "@/lib/flightServerService";

type Props = {
  tripId: number;
};

function formatDateTime(value: string | null) {
  if (!value) return null;

  const date = new Date(value);

  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

export default async function FlightsCard({
  tripId,
}: Props) {
  const flights = await getFlightsServer(tripId);

  const airportLabels = await getAirportLocationLabels(
    flights.flatMap((flight) => [
      flight.departureAirport,
      flight.arrivalAirport,
    ])
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Flights
          </h2>

          <p className="mt-1 text-slate-500">
            Airline reservations for this trip.
          </p>
        </div>

        <Link
          href={`/trip/${tripId}/add-flight`}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Flight
        </Link>
      </div>

      {flights.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-10 text-center">
          <p className="text-lg font-semibold text-slate-600">
            No flights added yet.
          </p>

          <p className="mt-2 text-slate-500">
            Click <strong>Add Flight</strong> to add your first reservation.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {flights.map((flight) => {
            const departure = formatDateTime(
              flight.departureDateTime
            );

            const arrival = formatDateTime(
              flight.arrivalDateTime
            );

            return (
              <div
                key={flight.id}
                className="rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xl font-bold">
                      {flight.airline}
                    </div>

                    <div className="text-slate-500">
                      Flight {flight.flightNumber}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/trip/${tripId}/edit-flight/${flight.id}`}
                      className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/trip/${tripId}/delete-flight/${flight.id}`}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Delete
                    </Link>
                  </div>
                </div>

                {flight.confirmationNumber && (
                  <div className="mt-4 text-sm text-slate-500">
                    Confirmation

                    <div className="font-semibold text-slate-700">
                      {flight.confirmationNumber}
                    </div>
                  </div>
                )}

                <div className="my-6 grid grid-cols-3 items-center text-center">
                  <div>
                    <div className="text-2xl font-bold">
                      {flight.departureAirport}
                    </div>

                    {airportLabels[flight.departureAirport] && (
                      <div className="mt-1 text-sm font-medium text-slate-500">
                        {airportLabels[flight.departureAirport]}
                      </div>
                    )}

                    {departure && (
                      <>
                        <div className="mt-2 text-sm">
                          {departure.date}
                        </div>

                        <div className="font-semibold">
                          {departure.time}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="text-3xl text-slate-400">
                    →
                  </div>

                  <div>
                    <div className="text-2xl font-bold">
                      {flight.arrivalAirport}
                    </div>

                    {airportLabels[flight.arrivalAirport] && (
                      <div className="mt-1 text-sm font-medium text-slate-500">
                        {airportLabels[flight.arrivalAirport]}
                      </div>
                    )}

                    {arrival && (
                      <>
                        <div className="mt-2 text-sm">
                          {arrival.date}
                        </div>

                        <div className="font-semibold">
                          {arrival.time}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 border-t pt-4 text-sm">
                  {flight.seat && (
                    <div>
                      <span className="font-semibold">
                        Seats:
                      </span>{" "}
                      {flight.seat}
                    </div>
                  )}

                  {flight.cabinClass && (
                    <div>
                      <span className="font-semibold">
                        Cabin:
                      </span>{" "}
                      {flight.cabinClass}
                    </div>
                  )}

                  {flight.cost !== null && (
                    <div>
                      <span className="font-semibold">
                        Cost:
                      </span>{" "}
                      ${flight.cost.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}