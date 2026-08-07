import AirportAutocomplete from "@/components/AirportAutocomplete";

type Props = {
  departureAirport: string;
  arrivalAirport: string;
  onDepartureAirportChange: (value: string) => void;
  onArrivalAirportChange: (value: string) => void;
};

export default function FlightAirportFields({
  departureAirport,
  arrivalAirport,
  onDepartureAirportChange,
  onArrivalAirportChange,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AirportAutocomplete
        label="Departure Airport *"
        value={departureAirport}
        onChange={onDepartureAirportChange}
      />

      <AirportAutocomplete
        label="Arrival Airport *"
        value={arrivalAirport}
        onChange={onArrivalAirportChange}
      />
    </div>
  );
}
