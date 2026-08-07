import TimePicker from "../TimePicker";

type Props = {
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  onDepartureDateChange: (value: string) => void;
  onDepartureTimeChange: (value: string) => void;
  onArrivalDateChange: (value: string) => void;
  onArrivalTimeChange: (value: string) => void;
};

function DateTimeRow({
  dateLabel,
  timeLabel,
  date,
  time,
  minDate,
  onDateChange,
  onTimeChange,
}: {
  dateLabel: string;
  timeLabel: string;
  date: string;
  time: string;
  minDate?: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block font-semibold">{dateLabel}</label>
        <input
          type="date"
          value={date}
          min={minDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>
      <div>
        <label className="mb-2 block font-semibold">{timeLabel}</label>
        <TimePicker value={time} onChange={onTimeChange} />
      </div>
    </div>
  );
}

export default function FlightScheduleFields(props: Props) {
  return (
    <>
      <DateTimeRow
        dateLabel="Departure Date"
        timeLabel="Departure Time"
        date={props.departureDate}
        time={props.departureTime}
        onDateChange={props.onDepartureDateChange}
        onTimeChange={props.onDepartureTimeChange}
      />
      <DateTimeRow
        dateLabel="Arrival Date"
        timeLabel="Arrival Time"
        date={props.arrivalDate}
        time={props.arrivalTime}
        minDate={props.departureDate}
        onDateChange={props.onArrivalDateChange}
        onTimeChange={props.onArrivalTimeChange}
      />
    </>
  );
}
