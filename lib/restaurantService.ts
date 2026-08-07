import { supabase } from "@/lib/supabase";
import { Restaurant } from "@/types/trip";

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

function mapRestaurantForDatabase(
  restaurant: Restaurant
) {
  return {
    trip_id: restaurant.tripId,

    restaurant_name: restaurant.restaurantName,
    address: restaurant.address,

    phone: restaurant.phone,

    reservation_date: restaurant.reservationDate,
    reservation_time: restaurant.reservationTime,

    confirmation_number:
      restaurant.confirmationNumber,

    notes: restaurant.notes,
  };
}

export async function getRestaurants(
  tripId: number
): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("trip_id", tripId)
    .order("reservation_date");

  if (error) throw error;

  return (data ?? []).map(
    mapDatabaseRestaurant
  );
}

export async function getRestaurant(
  id: number
): Promise<Restaurant | null> {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return null;
  }

  return mapDatabaseRestaurant(data);
}

export async function createRestaurant(
  restaurant: Restaurant
): Promise<Restaurant> {
  const { data, error } = await supabase
    .from("restaurants")
    .insert(
      mapRestaurantForDatabase(
        restaurant
      )
    )
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseRestaurant(data);
}

export async function updateRestaurant(
  restaurant: Restaurant
): Promise<Restaurant> {
  const { data, error } = await supabase
    .from("restaurants")
    .update({
      ...mapRestaurantForDatabase(
        restaurant
      ),
      updated_at: new Date().toISOString(),
    })
    .eq("id", restaurant.id)
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseRestaurant(data);
}

export async function deleteRestaurant(
  id: number
): Promise<void> {
  const { error } = await supabase
    .from("restaurants")
    .delete()
    .eq("id", id);

  if (error) throw error;
}