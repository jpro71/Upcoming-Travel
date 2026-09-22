import { notFound } from "next/navigation";
import { getSharedTripServer } from "@/lib/sharedTripServerService";
import {
  getAirportInfo,
  getAirportLocation,
  getAirportName,
} from "@/lib/airportData";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

type Flight = {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDateTime: string | null;
  arrivalDateTime: string | null;
  seat: string;
  cabinClass: string;
  notes: string;
};

type Journey = {
  flights: Flight[];
};

function parseDate(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function tripDate(value: string) {
  const date = parseDate(value);

  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function prominentDate(value: string | null) {
  const date = parseDate(value);

  if (!date) {
    return "";
  }

  return date
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}

function shortDate(value: string | null | undefined) {
  const date = parseDate(value);

  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function timeOnly(value: string | null | undefined) {
  const date = parseDate(value);

  if (!date) {
    return "";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function compactDateTime(value: string | null | undefined) {
  const date = parseDate(value);

  if (!date) {
    return "";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function minutesBetween(
  earlier: string | null,
  later: string | null
) {
  const first = parseDate(earlier);
  const second = parseDate(later);

  if (!first || !second) {
    return null;
  }

  return (second.getTime() - first.getTime()) / 60000;
}

function flightsConnect(current: Flight, next: Flight) {
  const currentArrival = getAirportInfo(
    current.arrivalAirport
  ).code;

  const nextDeparture = getAirportInfo(
    next.departureAirport
  ).code;

  if (
    !currentArrival ||
    !nextDeparture ||
    currentArrival !== nextDeparture
  ) {
    return false;
  }

  const layoverMinutes = minutesBetween(
    current.arrivalDateTime,
    next.departureDateTime
  );

  if (layoverMinutes === null) {
    return false;
  }

  return layoverMinutes >= 0 && layoverMinutes <= 12 * 60;
}

function groupFlightsIntoJourneys(flights: Flight[]): Journey[] {
  if (flights.length === 0) {
    return [];
  }

  const sorted = [...flights].sort((a, b) => {
    const aDate =
      parseDate(a.departureDateTime)?.getTime() ?? 0;

    const bDate =
      parseDate(b.departureDateTime)?.getTime() ?? 0;

    return aDate - bDate;
  });

  const journeys: Journey[] = [];
  let currentJourney: Flight[] = [sorted[0]];

  for (let index = 1; index < sorted.length; index += 1) {
    const previous =
      currentJourney[currentJourney.length - 1];

    const next = sorted[index];

    if (flightsConnect(previous, next)) {
      currentJourney.push(next);
    } else {
      journeys.push({
        flights: currentJourney,
      });

      currentJourney = [next];
    }
  }

  journeys.push({
    flights: currentJourney,
  });

  return journeys;
}

function journeyLabel(index: number, total: number) {
  if (total === 2) {
    return index === 0 ? "Outbound" : "Return";
  }

  if (total === 1) {
    return "Flight";
  }

  return `Journey ${index + 1}`;
}

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/70 bg-white/92 shadow-2xl backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center gap-2 text-white drop-shadow-lg">
      <span className="text-base">{icon}</span>

      <div className="text-[12px] font-black uppercase tracking-[0.14em]">
        {children}
      </div>
    </div>
  );
}

function AirportDetails({
  label,
  code,
  dateTime,
}: {
  label: string;
  code: string;
  dateTime: string | null;
}) {
  const location = getAirportLocation(code);
  const airportName = getAirportName(code);

  return (
    <div className="min-w-0">
      <div className="text-[10px] font-black uppercase tracking-wide text-slate-400 sm:text-[11px]">
        {label}
      </div>

      {location && (
        <div className="mt-1 text-[13px] font-extrabold leading-4 text-slate-900 sm:text-[14px] sm:leading-5">
          {location}
        </div>
      )}

      <div className="mt-0.5 text-[11px] font-semibold leading-[1rem] text-slate-600 sm:text-[12px] sm:leading-[1.15rem]">
        {airportName}
      </div>

      <div className="mt-1.5 text-[18px] font-black leading-none text-slate-950">
        {timeOnly(dateTime)}
      </div>
    </div>
  );
}

function MobileFlightRoute({
  flight,
}: {
  flight: Flight;
}) {
  return (
    <div className="mt-3 sm:hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] items-start gap-2">
        <AirportDetails
          label="Departure"
          code={flight.departureAirport}
          dateTime={flight.departureDateTime}
        />

        <div className="flex justify-center pt-8">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
            →
          </div>
        </div>

        <AirportDetails
          label="Arrival"
          code={flight.arrivalAirport}
          dateTime={flight.arrivalDateTime}
        />
      </div>
    </div>
  );
}

function DesktopFlightRoute({
  flight,
}: {
  flight: Flight;
}) {
  return (
    <div className="mt-2.5 hidden grid-cols-[minmax(0,1fr)_34px_minmax(0,1fr)] items-center gap-2 sm:grid">
      <AirportDetails
        label="Departure"
        code={flight.departureAirport}
        dateTime={flight.departureDateTime}
      />

      <div className="flex justify-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
          →
        </div>
      </div>

      <AirportDetails
        label="Arrival"
        code={flight.arrivalAirport}
        dateTime={flight.arrivalDateTime}
      />
    </div>
  );
}

function JourneyCard({
  journey,
  index,
  total,
}: {
  journey: Journey;
  index: number;
  total: number;
}) {
  const firstFlight = journey.flights[0];

  const lastFlight =
    journey.flights[journey.flights.length - 1];

  const firstAirport = getAirportInfo(
    firstFlight.departureAirport
  );

  const lastAirport = getAirportInfo(
    lastFlight.arrivalAirport
  );

  const label = journeyLabel(index, total);

  return (
    <GlassPanel className="h-full">
      <div className="flex items-center justify-between gap-3 border-b border-blue-100 bg-blue-50/95 px-3 py-2.5 sm:px-4">
        <div className="min-w-0">
          <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 sm:text-[11px]">
            {label}
          </div>

          <div className="mt-0.5 text-[12px] font-black tracking-[0.02em] text-blue-700 sm:text-[13px]">
            {prominentDate(firstFlight.departureDateTime)}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[11px] font-black text-slate-800 sm:text-[12px]">
            {firstAirport.code}
            <span className="mx-1.5 text-blue-500">
              →
            </span>
            {lastAirport.code}
          </div>

          {journey.flights.length > 1 && (
            <div className="mt-0.5 text-[10px] font-bold text-slate-500 sm:text-[11px]">
              {journey.flights.length} flight legs
            </div>
          )}
        </div>
      </div>

      <div className="px-3 py-3.5 sm:px-4">
        {journey.flights.map((flight, flightIndex) => {
          const nextFlight =
            journey.flights[flightIndex + 1];

          const layover =
            nextFlight &&
            minutesBetween(
              flight.arrivalDateTime,
              nextFlight.departureDateTime
            );

          return (
            <div
              key={`${flight.airline}-${flight.flightNumber}-${flightIndex}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 text-[13px] font-extrabold leading-5 text-slate-900 sm:text-[14px]">
                  {flight.airline} {flight.flightNumber}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {flight.cabinClass && (
                    <span className="hidden text-[11px] font-bold text-slate-500 sm:inline">
                      {flight.cabinClass}
                    </span>
                  )}

                  {flight.seat && (
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 sm:px-2.5 sm:text-[11px]">
                      Seat
                      {flight.seat.includes(",")
                        ? "s"
                        : ""}{" "}
                      {flight.seat}
                    </span>
                  )}
                </div>
              </div>

              {flight.cabinClass && (
                <div className="mt-0.5 text-[10px] font-bold text-slate-500 sm:hidden">
                  {flight.cabinClass}
                </div>
              )}

              <MobileFlightRoute flight={flight} />

              <DesktopFlightRoute flight={flight} />

              {flight.notes && (
                <div className="mt-2 text-[11px] leading-4 text-slate-500">
                  {flight.notes}
                </div>
              )}

              {nextFlight && (
                <div className="my-3 flex items-center gap-2">
                  <div className="h-px flex-1 bg-slate-200" />

                  <div className="whitespace-nowrap rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-amber-700 sm:px-3 sm:text-[11px]">
                    Connection
                    {layover !== null
                      ? ` · ${Math.floor(
                          layover / 60
                        )}h ${Math.round(
                          layover % 60
                        )}m`
                      : ""}
                  </div>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

export default async function SharedTripPage({
  params,
}: Props) {
  const { token } = await params;

  const data = await getSharedTripServer(token);

  if (!data) {
    notFound();
  }

  const { trip } = data;

  const journeys = groupFlightsIntoJourneys(
    data.flights
  );

  const hasHotels = data.hotels.length > 0;
  const hasRentalCars = data.rentalCars.length > 0;
  const hasRestaurants =
    data.restaurants.length > 0;
  const hasNotes = Boolean(trip.notes?.trim());

  const extraSections =
    Number(hasHotels) +
    Number(hasRentalCars) +
    Number(hasRestaurants) +
    Number(hasNotes);

  const bottomColumns =
    journeys.length + Math.min(extraSections, 2);

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-slate-950 lg:h-screen lg:min-h-0 lg:overflow-hidden">
      {trip.image ? (
        <img
          src={trip.image}
          alt=""
          className="fixed inset-0 h-[100dvh] w-full object-cover lg:absolute lg:h-full"
        />
      ) : (
        <div className="fixed inset-0 h-[100dvh] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 lg:absolute lg:h-full" />
      )}

      <div className="fixed inset-0 h-[100dvh] bg-gradient-to-b from-black/45 via-black/5 to-black/45 lg:absolute lg:h-full" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col p-3 sm:p-4 lg:h-screen lg:min-h-0">
        <header className="shrink-0 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-sky-200 sm:text-[13px] sm:tracking-[0.2em]">
                Portal Puffin · Shared Trip
              </div>

              <h1 className="max-w-full text-[30px] font-extrabold leading-[1.02] drop-shadow-lg sm:text-4xl lg:truncate lg:text-[40px]">
                {trip.title}
              </h1>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-semibold text-white drop-shadow-md sm:gap-x-5 sm:text-[15px]">
                {trip.destination && (
                  <span>
                    📍 {trip.destination}
                  </span>
                )}

                <span>
                  {tripDate(trip.startDate)} –{" "}
                  {tripDate(trip.endDate)}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              {trip.type && (
                <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold shadow-lg sm:text-[11px]">
                  {trip.type}
                </span>
              )}

              {trip.status && (
                <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-slate-800 shadow-lg sm:text-[11px]">
                  {trip.status}
                </span>
              )}
            </div>
          </div>
        </header>

        <div className="h-[180px] shrink-0 sm:h-[210px] lg:hidden" />

        <div className="hidden flex-1 lg:block" />

        <div className="grid gap-3 lg:max-h-[50vh] lg:grid-cols-12">
          {journeys.map((journey, index) => {
            let span = "lg:col-span-4";

            if (bottomColumns <= 2) {
              span = "lg:col-span-6";
            } else if (bottomColumns === 3) {
              span = "lg:col-span-4";
            } else {
              span = "lg:col-span-3";
            }

            return (
              <section
                key={`journey-${index}`}
                className={span}
              >
                <SectionTitle icon="✈️">
                  {journeyLabel(
                    index,
                    journeys.length
                  )}
                </SectionTitle>

                <JourneyCard
                  journey={journey}
                  index={index}
                  total={journeys.length}
                />
              </section>
            );
          })}

          {hasHotels && (
            <section
              className={
                bottomColumns <= 2
                  ? "lg:col-span-6"
                  : bottomColumns === 3
                    ? "lg:col-span-4"
                    : "lg:col-span-3"
              }
            >
              <SectionTitle icon="🏨">
                Lodging
              </SectionTitle>

              <GlassPanel className="h-full">
                <div className="px-4 py-4 sm:px-5">
                  {data.hotels.map(
                    (hotel, index) => (
                      <div
                        key={`${hotel.hotelName}-${index}`}
                        className={
                          index > 0
                            ? "mt-4 border-t border-slate-200 pt-4"
                            : ""
                        }
                      >
                        <div className="text-[18px] font-extrabold leading-6 text-slate-900">
                          {hotel.hotelName}
                        </div>

                        {hotel.address && (
                          <div className="mt-1.5 text-[13px] leading-5 text-slate-500">
                            {hotel.address}
                          </div>
                        )}

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-[12px] font-black uppercase tracking-wide text-slate-400">
                              Check-in
                            </div>

                            <div className="mt-1 text-[15px] font-semibold text-slate-700">
                              {compactDateTime(
                                hotel.checkIn
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="text-[12px] font-black uppercase tracking-wide text-slate-400">
                              Check-out
                            </div>

                            <div className="mt-1 text-[15px] font-semibold text-slate-700">
                              {compactDateTime(
                                hotel.checkOut
                              )}
                            </div>
                          </div>
                        </div>

                        {hotel.phone && (
                          <div className="mt-3 text-[13px] font-medium text-slate-500">
                            📞 {hotel.phone}
                          </div>
                        )}

                        {hotel.notes && (
                          <div className="mt-3 border-t border-slate-200 pt-3 text-[13px] leading-5 text-slate-500">
                            {hotel.notes}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </GlassPanel>
            </section>
          )}

          {hasRentalCars && !hasHotels && (
            <section className="lg:col-span-4">
              <SectionTitle icon="🚗">
                Rental Car
              </SectionTitle>

              <GlassPanel className="h-full px-4 py-3.5">
                {data.rentalCars.map(
                  (car, index) => (
                    <div
                      key={`${car.rentalCompany}-${index}`}
                      className={
                        index > 0
                          ? "mt-3 border-t border-slate-200 pt-3"
                          : ""
                      }
                    >
                      <div className="text-[15px] font-extrabold text-slate-900">
                        {car.rentalCompany}
                      </div>

                      {car.vehicleType && (
                        <div className="mt-0.5 text-[11px] font-semibold text-slate-500">
                          {car.vehicleType}
                        </div>
                      )}

                      <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] leading-4 text-slate-600">
                        <div>
                          <strong>Pickup</strong>
                          <br />
                          {car.pickupLocation}
                          <br />
                          {compactDateTime(
                            car.pickupAt
                          )}
                        </div>

                        <div>
                          <strong>Drop-off</strong>
                          <br />
                          {car.dropoffLocation}
                          <br />
                          {compactDateTime(
                            car.dropoffAt
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </GlassPanel>
            </section>
          )}

          {hasRestaurants &&
            !hasHotels &&
            !hasRentalCars && (
              <section className="lg:col-span-4">
                <SectionTitle icon="🍽️">
                  Restaurants
                </SectionTitle>

                <GlassPanel className="h-full px-4 py-3.5">
                  {data.restaurants.map(
                    (restaurant, index) => (
                      <div
                        key={`${restaurant.restaurantName}-${index}`}
                        className={
                          index > 0
                            ? "mt-2.5 border-t border-slate-200 pt-2.5"
                            : ""
                        }
                      >
                        <div className="text-[14px] font-extrabold text-slate-900">
                          {
                            restaurant.restaurantName
                          }
                        </div>

                        <div className="mt-1 text-[11px] font-bold text-blue-700">
                          {shortDate(
                            restaurant.reservationDate
                          )}

                          {restaurant.reservationTime
                            ? ` · ${restaurant.reservationTime}`
                            : ""}
                        </div>

                        {restaurant.address && (
                          <div className="mt-1 text-[11px] leading-4 text-slate-500">
                            {
                              restaurant.address
                            }
                          </div>
                        )}
                      </div>
                    )
                  )}
                </GlassPanel>
              </section>
            )}

          {hasNotes &&
            !hasHotels &&
            !hasRentalCars &&
            !hasRestaurants && (
              <section className="lg:col-span-4">
                <SectionTitle icon="📝">
                  Notes
                </SectionTitle>

                <GlassPanel className="h-full px-4 py-3.5">
                  <div className="whitespace-pre-wrap text-[12px] leading-5 text-slate-700">
                    {trip.notes}
                  </div>
                </GlassPanel>
              </section>
            )}
        </div>

        <footer className="mt-2 shrink-0 pb-1 text-center text-[9px] font-medium text-white/80 drop-shadow">
          Read-only itinerary shared through Portal Puffin
        </footer>
      </div>
    </main>
  );
}