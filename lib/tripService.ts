import { supabase } from "@/lib/supabase";
import { mapDatabaseTrip, mapTripForDatabase } from "@/mappers/tripMapper";
import { Trip } from "@/types/trip";

const DRAFT_KEY = "travel-app-trip-draft";

export type TripDraft = {
  tripType: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export async function getTrips(): Promise<Trip[]> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("start_date");

  if (error) throw error;

  return (data ?? []).map(mapDatabaseTrip);
}

export async function getTrip(id: number): Promise<Trip | null> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return mapDatabaseTrip(data);
}

export async function createTrip(data: TripDraft): Promise<Trip> {
  const trip: Trip = {
    id: 0,

    type: data.tripType as Trip["type"],
    status: "Planning",

    title: data.tripName.trim() || data.destination.trim() || "New Trip",
    destination: data.destination,

    startDate: data.startDate,
    endDate: data.endDate,

    createdAt: undefined,
    updatedAt: undefined,

    notes: "",

    image: "/images/default-trip.jpg",
    color: "#2563EB",

    travelers: ["Jim", "Denise"],
  };

  const { data: inserted, error } = await supabase
    .from("trips")
    .insert(mapTripForDatabase(trip))
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseTrip(inserted);
}

export async function updateTrip(trip: Trip): Promise<Trip> {
  const updateData = {
    ...mapTripForDatabase(trip),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("trips")
    .update(updateData)
    .eq("id", trip.id)
    .select()
    .single();

  if (error) throw error;

  return mapDatabaseTrip(data);
}

export async function deleteTrip(id: number): Promise<void> {
  const { error } = await supabase
    .from("trips")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export function saveDraft(data: TripDraft) {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
}

export function loadDraft(): TripDraft | null {
  const draft = sessionStorage.getItem(DRAFT_KEY);
  return draft ? JSON.parse(draft) : null;
}

export function clearDraft() {
  sessionStorage.removeItem(DRAFT_KEY);
}