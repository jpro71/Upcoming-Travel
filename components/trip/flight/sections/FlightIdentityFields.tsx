type Props = {
  airline: string;
  flightNumber: string;
  onAirlineChange: (value: string) => void;
  onFlightNumberChange: (value: string) => void;
};

export default function FlightIdentityFields({
  airline,
  flightNumber,
  onAirlineChange,
  onFlightNumberChange,
}: Props) {
  return (
    <>
      <div>
        <label className="mb-2 block font-semibold">Airline *</label>
        <input
          value={airline}
          onChange={(e) => onAirlineChange(e.target.value)}
          className="w-full rounded-xl border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">Flight Number *</label>
        <input
          value={flightNumber}
          onChange={(e) => onFlightNumberChange(e.target.value)}
          className="w-full rounded-xl border p-3"
          required
        />
      </div>
    </>
  );
}
