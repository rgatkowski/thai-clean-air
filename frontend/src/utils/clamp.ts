const clamp = (min: number, value: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export const randomClamped = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export default clamp;
