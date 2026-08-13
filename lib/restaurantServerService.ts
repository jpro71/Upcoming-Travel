import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { Restaurant } from "@/types/trip";

function mapDatabaseRestaurant(row: any): Restaurant {
  return {
    id: row.id,
    tripId: row.trip_id,
    restaurantName: row.restaurant_name,
    address: row.address ?? "",
    phone: row.phone ?? "",
    reservationDate: row.reservation_date ?? "",
    reservationTime: row.reservation_time ?? "",
    confirmationNumber: row.confirmation_number ?? "",
    notes: row.notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getRestaurantsServer(
  tripId: number
): Promise<Restaurant[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("trip_id", tripId)
    .order("reservation_date");

  if (error) {
    console.error("Error loading restaurants:", error);
    return [];
  }

  return (data ?? []).map(mapDatabaseRestaurant);
}

export async function getRestaurantServer(
  id: number
): Promise<Restaurant | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error loading restaurant:", error);
    return null;
  }

  return data ? mapDatabaseRestaurant(data) : null;
}

export async function deleteRestaurantServer(
  id: number
): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("restaurants")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Unable to delete restaurant: ${error.message}`
    );
  }
}
