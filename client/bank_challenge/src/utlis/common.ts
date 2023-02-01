export const REGEXP = {
  NUMBERS: /^[0-9]*$/,
};

export const getNumbertoAmount = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number);
};
