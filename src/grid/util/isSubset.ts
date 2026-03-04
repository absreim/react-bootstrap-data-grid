const isSubset: <T>(subset: T[], superSet: T[]) => boolean = (subset, superSet) => {
  const supersetSet = new Set(superSet);

  for (const member of subset) {
    if (!supersetSet.has(member)) {
      return false;
    }
  }

  return true;
}

export default isSubset;
