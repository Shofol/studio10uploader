export const mapSelectValue = (array, field) => {
  const filteredValue = array.filter((round) => round.value === field.value)[0];
  return filteredValue ? filteredValue : "";
};
