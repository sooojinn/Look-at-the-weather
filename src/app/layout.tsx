import '@/globals.css';
import type { Metadata } from 'next';
import { ToastProvider } from '@/components/common/molecules/ToastProvider';
import ReactQueryProvider from '@/lib/ReactQueryProvider';
import ScrollToTop from '@/components/common/ScrollToTop';
import NetworkBoundary from '@/components/common/NetworkBoundary';

export const metadata: Metadata = {
  title: '룩엣더웨더 | Look At The Weather',
  description: '계절별 옷차림, 나만의 스타일북',
  keywords: ['날씨', '패션', '옷차림', '온도별 옷차림', '기온별 옷차림', '계절별 옷차림', '패션 커뮤니티', '패션 공유'],
  openGraph: {
    title: '룩엣더웨더 | Look At The Weather',
    description: '계절별 옷차림, 나만의 스타일북',
  },
  icons: {
    icon: '/assets/favicon.png',
    shortcut: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,0, maximum-scale=1, user-scalable=no" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body>
        <div id="root">
          <ReactQueryProvider>
            <div className="max-w-md m-auto h-screen bg-background-white flex flex-col overflow-y-auto scrollbar-hide">
              <ScrollToTop />
              <NetworkBoundary>{children}</NetworkBoundary>
              <ToastProvider />
            </div>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
