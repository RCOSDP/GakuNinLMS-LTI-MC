export function insert<T>(list: T[], index: number, item: T) {
  const result = [...list];
  result.splice(index, 0, item);

  return result;
}

export function update<T>(list: T[], index: number, item: T) {
  const result = [...list];
  result.splice(index, 1, item);

  return result;
}

export function remove<T>(list: T[], index: number) {
  const result = [...list];
  result.splice(index, 1);

  return result;
}

export default function reorder<T>(
  list: T[],
  startIndex: number,
  endIndex: number
) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
