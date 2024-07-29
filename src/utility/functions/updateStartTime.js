import { add, format } from "date-fns";

const calculateTime = (duration, startTime) => {
  const [durationHours, durationMinutes, durationSeconds] = duration.split(":");
  return format(
    add(new Date(`12-01-2024 ${startTime}`), {
      hours: +durationHours,
      minutes: +durationMinutes,
      seconds: +durationSeconds,
    }),
    "HH:mm:ss"
  );
};

export const updateStartTime = (list, startTime) => {
  let currentStartTime = startTime;
  const tempArray = [...list];
  for (let i = 0; i < tempArray.length; i++) {
    if (i === 0) {
      tempArray[i].startTime = startTime;
    } else {
      const entryStartTime = calculateTime(
        tempArray[i - 1].duration,
        currentStartTime
      );

      tempArray[i].startTime = entryStartTime;
      currentStartTime = entryStartTime;
    }

    if (tempArray[i].children && tempArray[i].children.length > 0) {
      const updatedChilList = updateStartTime(
        tempArray[i].children,
        tempArray[i - 1]
          ? calculateTime(tempArray[i - 1].duration, tempArray[i - 1].startTime)
          : startTime
      );
      tempArray[i].children = updatedChilList;
    }
  }
  return tempArray;
};
