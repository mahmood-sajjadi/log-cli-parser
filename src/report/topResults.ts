export function getTopResults<T>(arr: T[], len: number): T[] {
  const l = Math.min(len, arr.length);
  return arr.slice(0, l);
}
