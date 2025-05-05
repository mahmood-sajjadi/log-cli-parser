export function distinctInStream<I> (list: I[], value: I): I[] {
  if (list.some(item => item === value)){
    return list;
  } else {
    // can be modified to address immutability with cost of performance
    list.push(value);
    return list;
  }
}

/**
 * @deprecated Use `distinctInStream` instead. This function will be removed in version 2.0.
 */
export function distinct<R, I> (arr: R[], fn: (item: R) => I): I[] {
  return arr.map(item => fn(item)).filter((value: I, index: number, array: I[]) => {
    return array.indexOf(value) === index;
  })
}
