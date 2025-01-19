export const countToken = (inputText: unknown): number => {
  if (typeof inputText !== "string") {
    throw new TypeError("Input must be a string");
  }
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};
