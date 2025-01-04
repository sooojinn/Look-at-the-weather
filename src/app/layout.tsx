import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Look At The Weather',
  description: '계절별 옷차림, 나만의 스타일북',
  openGraph: {
    title: 'Look At The Weather',
    description: '계절별 옷차림, 나만의 스타일북',
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
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
