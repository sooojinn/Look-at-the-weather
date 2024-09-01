import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router/routing';
import { RouterProvider } from 'react-router-dom';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return;

  const { worker } = await import('./mocks/browser');
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </React.StrictMode>,
  );
});
