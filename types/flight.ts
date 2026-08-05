export interface Flight {
  id: number;

  tripId: number;

  createdAt?: string;

  airline: string;
  flightNumber: string;
  confirmationNumber: string;

  departureAirport: string;
  arrivalAirport: string;

  departureDateTime: string | null;
  arrivalDateTime: string | null;

  seat: string;
  cabinClass: string;

  cost: number | null;

  notes: string;
}