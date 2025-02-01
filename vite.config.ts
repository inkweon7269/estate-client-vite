import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import withReactRouter from 'vite-plugin-next-react-router';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), withReactRouter()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    server: {
        port: 3000,
    },
});
