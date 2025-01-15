export const filterObjForTrueValues = (
  obj: Record<string, boolean>,
): boolean[] => {
  return Object.values(obj).filter((value) => value);
};
