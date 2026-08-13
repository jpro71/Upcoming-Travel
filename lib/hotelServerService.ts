import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { Hotel } from "@/types/trip";

function mapDatabaseHotel(row: any): Hotel {
  return {
    id: row.id,
    tripId: row.trip_id,
    hotelName: row.hotel_name,
    address: row.address ?? "",
    phone: row.phone ?? "",
    checkIn: row.check_in ?? "",
    checkOut: row.check_out ?? "",
    confirmationNumber: row.confirmation_number ?? "",
    notes: row.notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getHotelsServer(
  tripId: number
): Promise<Hotel[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("trip_id", tripId)
    .order("check_in");

  if (error) {
    console.error("Error loading hotels:", error);
    return [];
  }

  return (data ?? []).map(mapDatabaseHotel);
}

export async function getHotelServer(
  id: number
): Promise<Hotel | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error loading hotel:", error);
    return null;
  }

  return data ? mapDatabaseHotel(data) : null;
}

export async function deleteHotelServer(
  id: number
): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("hotels")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to delete hotel: ${error.message}`);
  }
}