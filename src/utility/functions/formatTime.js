import { intervalToDuration } from "date-fns";

export const formatSeconds = (seconds) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const zeroPad = (num) => String(num).padStart(2, "0");

  const formatted = `${zeroPad(
    duration.hours ? duration.hours : "0"
  )}:${zeroPad(duration.minutes ? duration.minutes : "0")}:${zeroPad(
    duration.seconds ? duration.seconds : "0"
  )}`;
  return formatted;

  // const formatted = formatDuration(duration, {
  //   format: ["hours", "minutes", "seconds"],
  //   zero: true,
  //   delimiter: ":",
  //   // locale: {
  //   //   formatDistance: (_token, count) => zeroPad(count)
  //   // }
  // });
};
