/**
 * Determines whether the elements of an array is the subset of another.
 *
 * @param subset - an array that may be the subset of another set
 * @param superset - an array that may be the superset of another set
 *
 * @returns a boolean value indicating whether the elements in subset are a
 * subset of the elements in superset
 *
 * @internal
 */
const isSubset: <T>(subset: T[], superset: T[]) => boolean = (
  subset,
  superset,
) => {
  const supersetSet = new Set(superset);

  for (const member of subset) {
    if (!supersetSet.has(member)) {
      return false;
    }
  }

  return true;
};

export default isSubset;
