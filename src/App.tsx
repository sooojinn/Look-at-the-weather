import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from '@components/common/molecules/ToastProvider';
import ScrollToTop from '@components/common/ScrollToTop';
import useNetworkStatus from './hooks/useNetworkStatus';
import Offline from '@pages/Offline';

const queryClient = new QueryClient();

function App() {
  const isOnline = useNetworkStatus();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background-light">
        <div className="max-w-md m-auto min-h-screen bg-background-white">
          <ScrollToTop />
          {isOnline ? <Outlet /> : <Offline />}
          <ToastProvider />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
