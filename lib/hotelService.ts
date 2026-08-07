import { supabase } from "@/lib/supabase";
import { Hotel } from "@/types/trip";

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

function mapHotelForDatabase(hotel: Hotel) {
  return {
    trip_id: hotel.tripId,

    hotel_name: hotel.hotelName,
    address: hotel.address,

    phone: hotel.phone,

    check_in: hotel.checkIn,
    check_out: hotel.checkOut,

    confirmation_number: hotel.confirmationNumber,

    notes: hotel.notes,
  };
}

export async function getHotels(
  tripId: number
): Promise<Hotel[]> {
  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("trip_id", tripId)
    .order("check_in");

  if (error) throw error;

  return (data ?? []).map(mapDatabaseHotel);
}

export async function getHotel(
  id: number
): Promise<Hotel | null> {
  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return null;
  }

  return mapDatabaseHotel(data);
}

export async function createHotel(
  hotel: Hotel
): Promise<Hotel> {
  const { data, error } = await supabase
    .from("hotels")
    .insert(mapHotelForDatabase(hotel))
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseHotel(data);
}

export async function updateHotel(
  hotel: Hotel
): Promise<Hotel> {
  const { data, error } = await supabase
    .from("hotels")
    .update({
      ...mapHotelForDatabase(hotel),
      updated_at: new Date().toISOString(),
    })
    .eq("id", hotel.id)
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseHotel(data);
}

export async function deleteHotel(
  id: number
): Promise<void> {
  const { error } = await supabase
    .from("hotels")
    .delete()
    .eq("id", id);

  if (error) throw error;
}