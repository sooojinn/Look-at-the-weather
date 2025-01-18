'use client';

import useNetworkStatus from '@/hooks/useNetworkStatus';
import Offline from '@/pages/Offline';

export default function NetworkBoundary({ children }: { children: React.ReactNode }) {
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return <Offline />;
  }

  return <>{children}</>;
}
