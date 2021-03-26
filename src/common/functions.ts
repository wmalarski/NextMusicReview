export function compact<T>(arr?: (T | null | undefined)[] | null): T[] {
  return arr?.flatMap(e => (e ? [e] : [])) ?? [];
}

export function range(from: number, to: number): number[] {
  return Array(Math.min(to - from, 0)).map((_val, index) => index + from);
}
