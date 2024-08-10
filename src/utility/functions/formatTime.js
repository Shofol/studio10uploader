import { hoursToSeconds, intervalToDuration, minutesToSeconds } from "date-fns";

export const formatSeconds = (seconds) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const zeroPad = (num) => String(num).padStart(2, "0");

  const formatted = `${zeroPad(
    duration.hours ? duration.hours : "0"
  )}:${zeroPad(duration.minutes ? duration.minutes : "0")}:${zeroPad(
    duration.seconds ? duration.seconds : "0"
  )}`;
  return formatted;
};

export const convertToSeconds = (time) => {
  const [durationHours, durationMinutes, durationSeconds] = time.split(":");
  return (
    hoursToSeconds(+durationHours) +
    minutesToSeconds(+durationMinutes) +
    +durationSeconds
  );
};
