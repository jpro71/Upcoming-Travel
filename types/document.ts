export type DocumentCategory =
  | "Boarding Pass"
  | "Hotel Confirmation"
  | "Cruise Documents"
  | "Rental Car"
  | "Passport"
  | "Ticket"
  | "Itinerary"
  | "Other";

export interface TripDocument {
  id: number;

  tripId: number;

  title: string;
  category: DocumentCategory;

  fileName: string;
  filePath: string;

  notes?: string;

  uploadedAt?: string;
}