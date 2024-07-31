export const mapSelectValue = (array, field) => {
  return array.filter((round) => round.value === field.value)[0];
};
