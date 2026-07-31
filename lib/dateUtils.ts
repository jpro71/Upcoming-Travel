export function formatDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  const startText = start.toLocaleDateString("en-US", options);
  const endText = end.toLocaleDateString("en-US", options);

  if (start.getFullYear() === end.getFullYear()) {
    return `${startText} – ${endText}, ${end.getFullYear()}`;
  }

  return `${startText}, ${start.getFullYear()} – ${endText}, ${end.getFullYear()}`;
}

export function daysUntil(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  return Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function tripStatus(startDate: string, endDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  if (today < start) return "Upcoming";
  if (today > end) return "Completed";

  return "Traveling";
}