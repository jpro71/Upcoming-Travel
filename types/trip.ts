export type TripStatus =
  | "Planning"
  | "Booked"
  | "Traveling"
  | "Completed"
  | "Cancelled";

export interface Trip {
  id: number;

  type: "Cruise" | "Vacation" | "Business" | "Golf";

  status: TripStatus;

  title: string;
  destination: string;

  startDate: string;
  endDate: string;

  createdAt?: string;
  updatedAt?: string;

  notes?: string;

  image?: string;
  color?: string;

  travelers: string[];

  airline?: string;
  hotel?: string;

  cruiseLine?: string;
  ship?: string;
  room?: string;
}