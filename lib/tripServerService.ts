import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { mapDatabaseTrip } from "@/mappers/tripMapper";
import { Trip } from "@/types/trip";

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