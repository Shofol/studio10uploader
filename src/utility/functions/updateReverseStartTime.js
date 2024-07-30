import { format, sub } from "date-fns";

const calculateTime = (duration, startTime) => {
  const [durationHours, durationMinutes, durationSeconds] = duration.split(":");
  return format(
    sub(new Date(`2024-01-01T${startTime}`), {
      hours: +durationHours,
      minutes: +durationMinutes,
      seconds: +durationSeconds,
    }),
    "HH:mm:ss"
  );
};

export const updateReverseStartTime = (list, startTime) => {
  let currentStartTime = startTime;
  const tempArray = [...list];
  for (let i = tempArray.length - 1; i >= 0; i--) {
    const entryStartTime = calculateTime(
      tempArray[i].duration,
      currentStartTime
    );

    tempArray[i].startTime = entryStartTime;
    currentStartTime = entryStartTime;

    if (tempArray[i].children && tempArray[i].children.length > 0) {
      const updatedChilList = updateReverseStartTime(
        tempArray[i].children,
        tempArray[i + 1] ? tempArray[i + 1].startTime : startTime
      );
      tempArray[i].children = updatedChilList;
    }
  }
  return tempArray;
};
