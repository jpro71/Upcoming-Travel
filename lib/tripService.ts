import { supabase } from "@/lib/supabase";
import {
  mapDatabaseTrip,
  mapTripForDatabase,
} from "@/mappers/tripMapper";
import { PlannerItems, Trip } from "@/types/trip";

const DRAFT_KEY = "travel-app-trip-draft";

const DEFAULT_PLANNER_ITEMS: PlannerItems = {
  flights: false,
  rentalCar: false,
  train: false,
  ferry: false,
  hotel: false,
  vacationRental: false,
  documents: false,
  restaurants: false,
  activities: false,
  packingList: false,
  budget: false,
  notes: false,
};

export type TripDraft = {
  tripType: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  plannerItems: PlannerItems;
};

async function getCurrentUserId(): Promise<string> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("You must be logged in.");
  }

  return user.id;
}

async function applyCoverPhoto(
  trip: Trip
): Promise<Trip> {
  if (!trip.coverPhotoPath) {
    return trip;
  }

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

export async function getTrips(
  userId: string
): Promise<Trip[]> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", userId)
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

export async function getTrip(
  id: number,
  userId: string
): Promise<Trip | null> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return applyCoverPhoto(
    mapDatabaseTrip(data)
  );
}

export async function createTrip(
  data: TripDraft
): Promise<Trip> {
  const userId = await getCurrentUserId();

  const trip: Trip = {
    id: 0,
    type: data.tripType as Trip["type"],
    status: "Planning",

    title:
      data.tripName.trim() ||
      data.destination.trim() ||
      "New Trip",

    destination: data.destination,

    startDate: data.startDate,
    endDate: data.endDate,

    createdAt: undefined,
    updatedAt: undefined,

    notes: "",

    image: "/images/default-trip.jpg",
    color: "#B01E2D",

    plannerItems: data.plannerItems,

    travelers: ["Jim", "Denise"],
  };

  const insertData = {
    ...mapTripForDatabase(trip),
    user_id: userId,
  };

  const {
    data: inserted,
    error,
  } = await supabase
    .from("trips")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapDatabaseTrip(inserted);
}

export async function updateTrip(
  trip: Trip
): Promise<Trip> {
  const userId = await getCurrentUserId();

  const updateData = {
    ...mapTripForDatabase(trip),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("trips")
    .update(updateData)
    .eq("id", trip.id)
    .eq("user_id", userId)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(
      "Trip not found or you do not have permission to update it."
    );
  }

  return mapDatabaseTrip(data);
}

export async function deleteTrip(
  id: number
): Promise<void> {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("trips")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
}

export function saveDraft(
  data: Partial<TripDraft>
): void {
  const existing = loadDraft();

  const plannerItems: PlannerItems = {
    ...DEFAULT_PLANNER_ITEMS,
    ...(existing?.plannerItems ?? {}),
    ...(data.plannerItems ?? {}),
  };

  const merged: TripDraft = {
    tripType: "",
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    ...existing,
    ...data,
    plannerItems,
  };

  sessionStorage.setItem(
    DRAFT_KEY,
    JSON.stringify(merged)
  );
}

export function loadDraft(): TripDraft | null {
  const draft =
    sessionStorage.getItem(DRAFT_KEY);

  return draft
    ? JSON.parse(draft)
    : null;
}

export function clearDraft(): void {
  sessionStorage.removeItem(DRAFT_KEY);
}