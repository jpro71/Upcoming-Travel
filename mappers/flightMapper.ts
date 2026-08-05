import { Flight } from "@/types/flight";

export function mapDatabaseFlight(row: any): Flight {
  return {
    id: row.id,
    tripId: row.trip_id,

    createdAt: row.created_at,

    airline: row.airline ?? "",
    flightNumber: row.flight_number ?? "",
    confirmationNumber: row.confirmation_number ?? "",

    departureAirport: row.departure_airport ?? "",
    arrivalAirport: row.arrival_airport ?? "",

    departureDateTime: row.departure_datetime ?? "",
    arrivalDateTime: row.arrival_datetime ?? "",

    seat: row.seat ?? "",
    cabinClass: row.cabin_class ?? "",

    cost: row.cost,

    notes: row.notes ?? "",
  };
}

export function mapFlightForDatabase(flight: Flight) {
  return {
    trip_id: flight.tripId,

    airline: flight.airline,
    flight_number: flight.flightNumber,
    confirmation_number: flight.confirmationNumber,

    departure_airport: flight.departureAirport,
    arrival_airport: flight.arrivalAirport,

    departure_datetime: flight.departureDateTime,
    arrival_datetime: flight.arrivalDateTime,

    seat: flight.seat,
    cabin_class: flight.cabinClass,

    cost: flight.cost,

    notes: flight.notes,
  };
}