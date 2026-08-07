"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function parseTime(value: string) {
  if (!value) return { hour: "", minute: "", period: "AM" };

  const [hour24Text, minute = "00"] = value.split(":");
  const hour24 = Number(hour24Text);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;

  return { hour: String(hour12), minute, period };
}

function to24Hour(hour: string, minute: string, period: string) {
  if (!hour) return "";
  let hour24 = Number(hour) % 12;
  if (period === "PM") hour24 += 12;
  return `${String(hour24).padStart(2, "0")}:${minute || "00"}`;
}

const selectClass = "rounded-xl border bg-white p-3";

export default function TimePicker({ value, onChange }: Props) {
  const { hour, minute, period } = parseTime(value);

  function update(nextHour: string, nextMinute: string, nextPeriod: string) {
    onChange(to24Hour(nextHour, nextMinute, nextPeriod));
  }

  return (
    <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
      <select
        aria-label="Hour"
        value={hour}
        onChange={(e) => update(e.target.value, minute || "00", period)}
        className={selectClass}
      >
        <option value="">Hour</option>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <select
        aria-label="Minute"
        value={minute}
        onChange={(e) => update(hour, e.target.value, period)}
        className={selectClass}
      >
        <option value="">Min</option>
        {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")).map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <select
        aria-label="AM or PM"
        value={period}
        onChange={(e) => update(hour, minute || "00", e.target.value)}
        className={selectClass}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}
