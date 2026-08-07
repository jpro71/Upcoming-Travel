"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFlight, updateFlight } from "@/lib/flightService";
import { Flight } from "@/types/flight";
import FlightAirportFields from "@/components/trip/flight/sections/FlightAirportFields";
import FlightBookingFields from "@/components/trip/flight/sections/FlightBookingFields";
import FlightIdentityFields from "@/components/trip/flight/sections/FlightIdentityFields";
import FlightScheduleFields from "@/components/trip/flight/sections/FlightScheduleFields";

type Props = {
  tripId: number;
  defaultDepartureDate: string;
  defaultArrivalDate: string;
  flight?: Flight;
  isEditing?: boolean;
};

function extractDate(value?: string | null) {
  return value ? value.substring(0, 10) : "";
}

function extractTime(value?: string | null) {
  return value ? value.substring(11, 16) : "";
}

function combineDateTime(date: string, time: string): string | null {
  return date ? `${date}T${time || "00:00"}:00` : null;
}

export default function FlightForm({
  tripId,
  defaultDepartureDate,
  defaultArrivalDate,
  flight,
  isEditing = false,
}: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [airline, setAirline] = useState(flight?.airline ?? "");
  const [flightNumber, setFlightNumber] = useState(flight?.flightNumber ?? "");
  const [departureAirport, setDepartureAirport] = useState(flight?.departureAirport ?? "");
  const [arrivalAirport, setArrivalAirport] = useState(flight?.arrivalAirport ?? "");
  const [departureDate, setDepartureDate] = useState(
    extractDate(flight?.departureDateTime) || defaultDepartureDate
  );
  const [departureTime, setDepartureTime] = useState(extractTime(flight?.departureDateTime));
  const [arrivalDate, setArrivalDate] = useState(
    extractDate(flight?.arrivalDateTime) || defaultArrivalDate
  );
  const [arrivalTime, setArrivalTime] = useState(extractTime(flight?.arrivalDateTime));
  const [seats, setSeats] = useState(flight?.seat ?? "");
  const [confirmationNumber, setConfirmationNumber] = useState(
    flight?.confirmationNumber ?? ""
  );

  function handleDepartureDateChange(date: string) {
    setDepartureDate(date);
    if (!arrivalDate || arrivalDate < date) setArrivalDate(date);
  }

  function handleDepartureTimeChange(time: string) {
    setDepartureTime(time);
    if (!arrivalTime) setArrivalTime(time);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    try {
      const flightRecord: Flight = {
        id: flight?.id ?? 0,
        tripId,
        airline,
        flightNumber,
        departureAirport,
        arrivalAirport,
        departureDateTime: combineDateTime(departureDate, departureTime),
        arrivalDateTime: combineDateTime(arrivalDate, arrivalTime),
        seat: seats,
        confirmationNumber,
        cabinClass: flight?.cabinClass ?? "",
        cost: flight?.cost ?? null,
        notes: flight?.notes ?? "",
        createdAt: flight?.createdAt,
      };

      if (isEditing) await updateFlight(flightRecord);
      else await createFlight(flightRecord);

      router.push(`/trip/${tripId}`);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(`Unable to ${isEditing ? "update" : "save"} flight.`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
      <FlightIdentityFields
        airline={airline}
        flightNumber={flightNumber}
        onAirlineChange={setAirline}
        onFlightNumberChange={setFlightNumber}
      />
      <FlightAirportFields
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        onDepartureAirportChange={setDepartureAirport}
        onArrivalAirportChange={setArrivalAirport}
      />
      <FlightScheduleFields
        departureDate={departureDate}
        departureTime={departureTime}
        arrivalDate={arrivalDate}
        arrivalTime={arrivalTime}
        onDepartureDateChange={handleDepartureDateChange}
        onDepartureTimeChange={handleDepartureTimeChange}
        onArrivalDateChange={setArrivalDate}
        onArrivalTimeChange={setArrivalTime}
      />
      <FlightBookingFields
        seats={seats}
        confirmationNumber={confirmationNumber}
        onSeatsChange={setSeats}
        onConfirmationNumberChange={setConfirmationNumber}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? (isEditing ? "Updating..." : "Saving...") : isEditing ? "Update Flight" : "Save Flight"}
        </button>
      </div>
    </form>
  );
}
