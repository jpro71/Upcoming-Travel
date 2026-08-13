import { createSupabaseServerClient } from "@/lib/supabaseServer";

export type Flight = {
  id: number;
  tripId: number;
  airline: string;
  flightNumber: string;
  confirmationNumber: string | null;
  departureAirport: string;
  arrivalAirport: string;
  departureDateTime: string | null;
  arrivalDateTime: string | null;
  seat: string | null;
  cabinClass: string | null;
  cost: number | null;
};

export async function getFlightsServer(
  tripId: number
): Promise<Flight[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("flights")
    .select("*")
    .eq("trip_id", tripId)
    .order("departure_time", { ascending: true });

  if (error) {
    console.error("Error loading flights:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    tripId: row.trip_id,
    airline: row.airline,
    flightNumber: row.flight_number,
    confirmationNumber: row.confirmation_number,
    departureAirport: row.departure_airport,
    arrivalAirport: row.arrival_airport,
    departureDateTime: row.departure_time,
    arrivalDateTime: row.arrival_time,
    seat: row.seat,
    cabinClass: row.cabin_class,
    cost: row.cost === null ? null : Number(row.cost),
  }));
}