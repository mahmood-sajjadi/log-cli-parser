export interface countResultRow<I> {item: I, count: number};
export type countResult<I> = countResultRow<I>[];

export function countInStream<I> (list: countResult<I>, item: I): countResult<I> {
  const searchResult = list.find(row => row.item === item);
  if (searchResult) {
    // this line will mutate the list objet
    // to improve it we need to clone the object
    // which will complex the code and it is
    // not needed for such a simple logic.
    // but can be considered if code get bigger
    searchResult.count++;
  } else {
    // this line will mutate the list objet
    // see previous comment
    list.push({item, count: 1});
  }
  return list;
}

/**
 * @deprecated Use `countInStream` instead. This function will be removed in version 2.0.
 */
export function count<R, I> (arr: R[], fn: (item: R) => I): countResult<I> {
  // countInStream will mutate the list but will not create any issue as it is isolated
  return arr.reduce((list: countResult<I>, curr: R) => countInStream(list, fn(curr)), []);
}
