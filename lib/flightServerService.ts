import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { Flight } from "@/types/flight";

function mapFlight(row: any): Flight {
  return {
    id: row.id,
    tripId: row.trip_id,
    airline: row.airline,
    flightNumber: row.flight_number,
    confirmationNumber: row.confirmation_number,
    departureAirport: row.departure_airport,
    arrivalAirport: row.arrival_airport,
    departureDateTime: row.departure_datetime,
    arrivalDateTime: row.arrival_datetime,
    seat: row.seat,
    cabinClass: row.cabin_class,
    cost: row.cost === null ? null : Number(row.cost),
    notes: row.notes,
  };
}

export async function getFlightsServer(
  tripId: number
): Promise<Flight[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("flights")
    .select("*")
    .eq("trip_id", tripId);

  if (error) {
    console.error("Error loading flights:", error);
    return [];
  }

  return (data ?? []).map(mapFlight);
}

export async function getFlightServer(
  flightId: number
): Promise<Flight | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("flights")
    .select("*")
    .eq("id", flightId)
    .maybeSingle();

  if (error) {
    console.error("Error loading flight:", error);
    return null;
  }

  return data ? mapFlight(data) : null;
}