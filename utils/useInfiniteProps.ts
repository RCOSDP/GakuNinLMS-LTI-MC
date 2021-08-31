import { useCallback } from "react";
import { SWRInfiniteResponse } from "swr/infinite";

function useInfiniteProps<Data>({
  data,
  size,
  setSize,
  isValidating,
}: SWRInfiniteResponse<Data[]>) {
  const [prev] = data?.slice(-1) ?? [];
  const hasNextPage = prev === undefined || prev.length > 0;
  const loading = isValidating && data?.length !== size;
  const onLoadMore = useCallback(() => setSize((n) => n + 1), [setSize]);
  return { loading, hasNextPage, onLoadMore };
}

export default useInfiniteProps;
