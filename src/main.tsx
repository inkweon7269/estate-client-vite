import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
