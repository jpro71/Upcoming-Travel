import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { RentalCar } from "@/types/trip";

function mapDatabaseRentalCar(row: any): RentalCar {
  return {
    id: row.id,
    tripId: row.trip_id,
    rentalCompany: row.rental_company,
    confirmationNumber: row.confirmation_number ?? "",
    pickupLocation: row.pickup_location ?? "",
    pickupAt: row.pickup_at ?? "",
    dropoffLocation: row.dropoff_location ?? "",
    dropoffAt: row.dropoff_at ?? "",
    vehicleType: row.vehicle_type ?? "",
    totalCost:
      row.total_cost === null || row.total_cost === undefined
        ? undefined
        : Number(row.total_cost),
    notes: row.notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getRentalCarsServer(
  tripId: number
): Promise<RentalCar[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("rental_cars")
    .select("*")
    .eq("trip_id", tripId)
    .order("pickup_at");

  if (error) {
    console.error("Error loading rental cars:", error);
    return [];
  }

  return (data ?? []).map(mapDatabaseRentalCar);
}

export async function getRentalCarServer(
  id: number
): Promise<RentalCar | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("rental_cars")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error loading rental car:", error);
    return null;
  }

  return data ? mapDatabaseRentalCar(data) : null;
}

export async function deleteRentalCarServer(
  id: number
): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("rental_cars")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Unable to delete rental car: ${error.message}`
    );
  }
}