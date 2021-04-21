export function compact<T>(arr?: (T | null | undefined)[] | null): T[] {
  return arr?.flatMap(e => (e ? [e] : [])) ?? [];
}

export function range(from: number, to: number): number[] {
  return Array(Math.max(to - from, 0))
    .fill(1)
    .map((_val, index) => index + from);
}
