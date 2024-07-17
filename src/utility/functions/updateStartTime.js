import { format, sub } from "date-fns";

export const updateStartTime = (list, startTime) => {
  let currentStartTime = startTime;
  const tempArray = [...list];
  for (let i = tempArray.length - 1; i >= 0; i--) {
    const [durationHours, durationMinutes, durationSeconds] =
      tempArray[i].duration.split(":");
    const entryStartTime = format(
      sub(new Date(`12-01-2024 ${currentStartTime}`), {
        hours: +durationHours,
        minutes: +durationMinutes,
        seconds: +durationSeconds
      }),
      "hh:mm:ss a"
    );
    tempArray[i].startTime = entryStartTime;
    currentStartTime = entryStartTime;

    if (tempArray[i].children && tempArray[i].children.length > 0) {
      const updatedChilList = updateStartTime(
        tempArray[i].children,
        tempArray[i + 1] ? tempArray[i + 1].startTime : startTime
      );
      tempArray[i].children = updatedChilList;
    }
  }
  return tempArray;
};
