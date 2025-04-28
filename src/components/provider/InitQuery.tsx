'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface InitQueryProps<T> {
  queryKey: string[];
  data: T;
}

export default function InitQuery<T>({ queryKey, data }: InitQueryProps<T>) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!queryKey || data === undefined) return;

    queryClient.setQueryData(queryKey, data);
  }, [queryKey, data, queryClient]);

  return null;
}
