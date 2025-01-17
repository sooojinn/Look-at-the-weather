import { useCallback, useMemo } from 'react';

export default function useQueryStatus(
  queries: Array<{ isLoading: boolean; isSuccess: boolean; isError: boolean; refetch: () => void }>,
) {
  const isLoading = useMemo(() => queries.some((query) => query.isLoading), [queries]);
  const isSuccess = useMemo(() => queries.every((query) => query.isSuccess), [queries]);
  const isError = useMemo(() => !isLoading && queries.some((query) => query.isError), [isLoading, queries]);

  const handleRefetch = useCallback(() => {
    queries.forEach((query) => {
      if (query.isError) query.refetch();
    });
  }, [queries]);

  return { isLoading, isSuccess, isError, handleRefetch };
}
