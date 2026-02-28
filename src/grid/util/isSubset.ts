const isSubset: (subset: number[], superSet: number[]) => boolean = (subset, superSet) => {
  const supersetSet = new Set(superSet);

  for (const num of subset) {
    if (!supersetSet.has(num)) {
      return false;
    }
  }

  return true;
}

export default isSubset;
