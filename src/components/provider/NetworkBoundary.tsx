'use client';

import useNetworkStatus from '@/hooks/useNetworkStatus';
import OfflinePage from '../common/page/OfflinePage';

export default function NetworkBoundary({ children }: { children: React.ReactNode }) {
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return <OfflinePage />;
  }

  return <>{children}</>;
}
