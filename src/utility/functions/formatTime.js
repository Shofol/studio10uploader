import { formatDuration, intervalToDuration } from "date-fns";

export const formatSeconds = (seconds) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const zeroPad = (num) => String(num).padStart(2, "0");

  const formatted = formatDuration(duration, {
    format: ["hours", "minutes", "seconds"],
    zero: true,
    delimiter: ":",
    locale: {
      formatDistance: (_token, count) => zeroPad(count)
    }
  });
  return formatted.length === 2 ? `00:00:${formatted}` : formatted.length === 5 ? `00:${formatted}` : formatted;
};
