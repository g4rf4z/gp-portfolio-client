export const typeConvertor = (type, value) => {
  if (value === undefined) return null;
  if (value instanceof type || value === null) return value;
  return new type(value);
};
