export type TripStatus =
  | "Planning"
  | "Booked"
  | "Traveling"
  | "Completed"
  | "Cancelled";

export interface PlannerItems {
  flights: boolean;
  rentalCar: boolean;
  train: boolean;
  ferry: boolean;
  hotel: boolean;
  vacationRental: boolean;
  documents: boolean;
  restaurants: boolean;
  activities: boolean;
  packingList: boolean;
  budget: boolean;
  notes: boolean;
}

export interface Hotel {
  id: number;

  tripId: number;

  hotelName: string;
  address?: string;
  phone?: string;

  checkIn?: string;
  checkOut?: string;

  confirmationNumber?: string;

  notes?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface RentalCar {
  id: number;

  tripId: number;

  rentalCompany: string;
  confirmationNumber?: string;

  pickupLocation?: string;
  pickupAt?: string;

  dropoffLocation?: string;
  dropoffAt?: string;

  vehicleType?: string;
  totalCost?: number;

  notes?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface Restaurant {
  id: number;

  tripId: number;

  restaurantName: string;
  address?: string;
  phone?: string;

  reservationDate?: string;
  reservationTime?: string;

  confirmationNumber?: string;

  notes?: string;

  createdAt?: string;
  updatedAt?: string;
}

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

  coverPhotoPath?: string;
  coverPhotoFilename?: string;

  plannerItems?: PlannerItems;

  travelers: string[];

  airline?: string;
  hotel?: string;

  cruiseLine?: string;
  ship?: string;
  room?: string;
}