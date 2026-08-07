type Props = {
  seats: string;
  confirmationNumber: string;
  onSeatsChange: (value: string) => void;
  onConfirmationNumberChange: (value: string) => void;
};

export default function FlightBookingFields({
  seats,
  confirmationNumber,
  onSeatsChange,
  onConfirmationNumberChange,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block font-semibold">Seats</label>
        <input
          value={seats}
          onChange={(e) => onSeatsChange(e.target.value.toUpperCase())}
          className="w-full rounded-xl border p-3"
        />
      </div>
      <div>
        <label className="mb-2 block font-semibold">Confirmation Number</label>
        <input
          value={confirmationNumber}
          onChange={(e) => onConfirmationNumberChange(e.target.value.toUpperCase())}
          className="w-full rounded-xl border p-3"
        />
      </div>
    </div>
  );
}
