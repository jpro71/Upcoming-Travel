import { Trip } from "@/types/trip";

export function mapDatabaseTrip(row: any): Trip {
  return {
    id: row.id,

    type: row.type,
    status: row.status,

    title: row.title,
    destination: row.destination,

    startDate: row.start_date,
    endDate: row.end_date,

    createdAt: row.created_at,
    updatedAt: row.updated_at,

    notes: row.notes ?? "",

    image: row.image ?? "/images/default-trip.jpg",
    color: row.color ?? "#2563EB",

    coverPhotoPath: row.cover_photo_path ?? undefined,
    coverPhotoFilename: row.cover_photo_filename ?? undefined,

    plannerItems: row.planner_items ?? undefined,

    travelers: [],
  };
}

export function mapTripForDatabase(trip: Trip) {
  return {
    type: trip.type,
    status: trip.status,

    title: trip.title,
    destination: trip.destination,

    start_date: trip.startDate,
    end_date: trip.endDate,

    notes: trip.notes,

    image: trip.image,
    color: trip.color,

    cover_photo_path: trip.coverPhotoPath,
    cover_photo_filename: trip.coverPhotoFilename,

    planner_items: trip.plannerItems,
  };
}