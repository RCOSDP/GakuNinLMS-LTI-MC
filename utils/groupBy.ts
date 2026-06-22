/**
 * 配列をキー関数の戻り値でグループ化する
 */
export default function groupBy<T, K extends string>(
  items: readonly T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;

  for (const item of items) {
    const key = getKey(item);
    (result[key] ??= []).push(item);
  }

  return result;
}
