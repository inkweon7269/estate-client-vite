import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import GlobPlugin from 'vite-plugin-glob';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), GlobPlugin()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    server: {
        port: 3000,
    },
});
