import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { mapDatabaseTrip } from "@/mappers/tripMapper";
import { PlannerItems, Trip } from "@/types/trip";

async function applyCoverPhoto(
  trip: Trip
): Promise<Trip> {
  if (!trip.coverPhotoPath) {
    return trip;
  }

  const supabase =
    await createSupabaseServerClient();

  const { data } = await supabase.storage
    .from("trip-covers")
    .createSignedUrl(
      trip.coverPhotoPath,
      60 * 60
    );

  if (data?.signedUrl) {
    trip.image = data.signedUrl;
  }

  return trip;
}

export async function getTripsServer(): Promise<Trip[]> {
  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", user.id)
    .order("start_date");

  if (error) {
    throw error;
  }

  const trips = (data ?? []).map(
    mapDatabaseTrip
  );

  return Promise.all(
    trips.map(applyCoverPhoto)
  );
}

export async function getTripServer(
  id: number
): Promise<Trip | null> {
  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return applyCoverPhoto(
    mapDatabaseTrip(data)
  );
}

export async function enableTripPlannerItem(
  tripId: number,
  item: keyof PlannerItems
): Promise<void> {
  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: trip, error: tripError } =
    await supabase
      .from("trips")
      .select("planner_items")
      .eq("id", tripId)
      .eq("user_id", user.id)
      .maybeSingle();

  if (tripError) {
    throw tripError;
  }

  if (!trip) {
    throw new Error("Trip not found.");
  }

  const currentPlannerItems =
    (trip.planner_items ?? {}) as Partial<PlannerItems>;

  const updatedPlannerItems: PlannerItems = {
    flights: currentPlannerItems.flights ?? false,
    rentalCar: currentPlannerItems.rentalCar ?? false,
    train: currentPlannerItems.train ?? false,
    ferry: currentPlannerItems.ferry ?? false,
    hotel: currentPlannerItems.hotel ?? false,
    vacationRental:
      currentPlannerItems.vacationRental ?? false,
    documents: currentPlannerItems.documents ?? false,
    restaurants:
      currentPlannerItems.restaurants ?? false,
    activities: currentPlannerItems.activities ?? false,
    packingList:
      currentPlannerItems.packingList ?? false,
    budget: currentPlannerItems.budget ?? false,
    notes: currentPlannerItems.notes ?? false,
    [item]: true,
  };

  const { error: updateError } = await supabase
    .from("trips")
    .update({
      planner_items: updatedPlannerItems,
    })
    .eq("id", tripId)
    .eq("user_id", user.id);

  if (updateError) {
    throw updateError;
  }
}