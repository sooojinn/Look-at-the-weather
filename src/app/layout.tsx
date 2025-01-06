import '@/globals.css';
import type { Metadata } from 'next';
import { ToastProvider } from '@/components/common/molecules/ToastProvider';
import ReactQueryProvider from '@/lib/ReactQueryProvider';
import ScrollToTop from '@/components/common/ScrollToTop';
// import useNetworkStatus from '@/hooks/useNetworkStatus';
// import Offline from '@/pages/Offline';

export const metadata: Metadata = {
  title: 'Look At The Weather',
  description: '계절별 옷차림, 나만의 스타일북',
  openGraph: {
    title: 'Look At The Weather',
    description: '계절별 옷차림, 나만의 스타일북',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const isOnline = useNetworkStatus();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,0, maximum-scale=1, user-scalable=no" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body>
        <div id="root">
          <ReactQueryProvider>
            <div className="bg-background-light">
              <div className="max-w-md m-auto min-h-screen bg-background-white">
                <ScrollToTop />
                {/* {isOnline ? <>{children}</> : <Offline />} */}
                {children}
                <ToastProvider />
              </div>
            </div>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
