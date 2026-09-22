import { createSupabaseServerClient } from "@/lib/supabaseServer";

export type SharedTripData = {
  trip: {
    type: string;
    status: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    notes: string;
    coverPhotoPath: string | null;
    image: string | null;
  };

  flights: Array<{
    airline: string;
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    departureDateTime: string | null;
    arrivalDateTime: string | null;
    seat: string;
    cabinClass: string;
    notes: string;
  }>;

  rentalCars: Array<{
    rentalCompany: string;
    pickupLocation: string;
    pickupAt: string;
    dropoffLocation: string;
    dropoffAt: string;
    vehicleType: string;
    notes: string;
  }>;

  hotels: Array<{
    hotelName: string;
    address: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    notes: string;
  }>;

  restaurants: Array<{
    restaurantName: string;
    address: string;
    phone: string;
    reservationDate: string;
    reservationTime: string;
    notes: string;
  }>;
};

export async function getSharedTripServer(
  token: string
): Promise<SharedTripData | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc(
    "get_shared_trip_data",
    {
      requested_token: token,
    }
  );

  if (error || !data) {
    return null;
  }

  const sharedTrip = data as SharedTripData;

  sharedTrip.trip.image = null;

  if (sharedTrip.trip.coverPhotoPath) {
    const { data: signedImage } =
      await supabase.storage
        .from("trip-covers")
        .createSignedUrl(
          sharedTrip.trip.coverPhotoPath,
          60 * 60
        );

    if (signedImage?.signedUrl) {
      sharedTrip.trip.image =
        signedImage.signedUrl;
    }
  }

  return sharedTrip;
}