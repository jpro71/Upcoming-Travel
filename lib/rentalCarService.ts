import { supabase } from "@/lib/supabase";
import { RentalCar } from "@/types/trip";

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

function mapRentalCarForDatabase(rentalCar: RentalCar) {
  return {
    trip_id: rentalCar.tripId,

    rental_company: rentalCar.rentalCompany,
    confirmation_number:
      rentalCar.confirmationNumber || null,

    pickup_location:
      rentalCar.pickupLocation || null,

    pickup_at:
      rentalCar.pickupAt || null,

    dropoff_location:
      rentalCar.dropoffLocation || null,

    dropoff_at:
      rentalCar.dropoffAt || null,

    vehicle_type:
      rentalCar.vehicleType || null,

    total_cost:
      rentalCar.totalCost ?? null,

    notes:
      rentalCar.notes || null,
  };
}

export async function getRentalCars(
  tripId: number
): Promise<RentalCar[]> {
  const { data, error } = await supabase
    .from("rental_cars")
    .select("*")
    .eq("trip_id", tripId)
    .order("pickup_at");

  if (error) throw error;

  return (data ?? []).map(mapDatabaseRentalCar);
}

export async function getRentalCar(
  id: number
): Promise<RentalCar | null> {
  const { data, error } = await supabase
    .from("rental_cars")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return null;
  }

  return mapDatabaseRentalCar(data);
}

export async function createRentalCar(
  rentalCar: RentalCar
): Promise<RentalCar> {
  const { data, error } = await supabase
    .from("rental_cars")
    .insert(mapRentalCarForDatabase(rentalCar))
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseRentalCar(data);
}

export async function updateRentalCar(
  rentalCar: RentalCar
): Promise<RentalCar> {
  const { data, error } = await supabase
    .from("rental_cars")
    .update({
      ...mapRentalCarForDatabase(rentalCar),
      updated_at: new Date().toISOString(),
    })
    .eq("id", rentalCar.id)
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseRentalCar(data);
}

export async function deleteRentalCar(
  id: number
): Promise<void> {
  const { error } = await supabase
    .from("rental_cars")
    .delete()
    .eq("id", id);

  if (error) throw error;
}