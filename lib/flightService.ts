import { supabase } from "@/lib/supabase";
import {
  mapDatabaseFlight,
  mapFlightForDatabase,
} from "@/mappers/flightMapper";
import { Flight } from "@/types/flight";

export async function getFlights(
  tripId: number
): Promise<Flight[]> {
  const { data, error } = await supabase
    .from("flights")
    .select("*")
    .eq("trip_id", tripId)
    .order("departure_datetime");

  if (error) throw error;

  return (data ?? []).map(mapDatabaseFlight);
}

export async function getFlight(
  id: number
): Promise<Flight | null> {
  const { data, error } = await supabase
    .from("flights")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return null;
  }

  return mapDatabaseFlight(data);
}

export async function createFlight(
  flight: Flight
): Promise<Flight> {
  const { data, error } = await supabase
    .from("flights")
    .insert(mapFlightForDatabase(flight))
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseFlight(data);
}

export async function updateFlight(
  flight: Flight
): Promise<Flight> {
  const { data, error } = await supabase
    .from("flights")
    .update(mapFlightForDatabase(flight))
    .eq("id", flight.id)
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseFlight(data);
}

export async function deleteFlight(
  id: number
): Promise<void> {
  const { error } = await supabase
    .from("flights")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function searchAirports(
  search: string
) {
  if (!search.trim()) return [];

  const { data, error } = await supabase
    .from("airports")
    .select("iata_code, airport_name, city, display_name")
    .or(
      `iata_code.ilike.%${search}%,city.ilike.%${search}%,airport_name.ilike.%${search}%`
    )
    .order("city")
    .limit(10);

  if (error) throw error;

  return data ?? [];
}
export async function getAirportLocationLabels(
  codes: string[]
): Promise<Record<string, string>> {
  const uniqueCodes = [...new Set(codes.filter(Boolean).map((code) => code.toUpperCase()))];

  if (uniqueCodes.length === 0) return {};

  const { data, error } = await supabase
    .from("airports")
    .select("iata_code, city, display_name")
    .in("iata_code", uniqueCodes);

  if (error) throw error;

  return Object.fromEntries(
    (data ?? []).map((airport) => {
      const cityState = airport.display_name?.match(
        new RegExp(`${airport.city}\\s*,\\s*[A-Z]{2}`, "i")
      )?.[0];

      return [
        airport.iata_code,
        cityState ?? airport.city ?? airport.display_name ?? "",
      ];
    })
  );
}
