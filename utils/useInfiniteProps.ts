import { useCallback } from "react";

function useInfiniteProps<Data>(
  data: Data[][] | undefined,
  size: number,
  setSize: (size: number | ((size: number) => number)) => Promise<unknown>
) {
  const [prev] = data?.slice(-1) ?? [];
  const hasNextPage = prev === undefined || prev.length > 0;
  const loading = data?.length !== size;
  const onLoadMore = useCallback(() => setSize((n) => n + 1), [setSize]);
  return { loading, hasNextPage, onLoadMore };
}

export default useInfiniteProps;
