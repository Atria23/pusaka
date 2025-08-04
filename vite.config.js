import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    // yang server di bawah sesuaikan dengan ip host ipv4 dari wifi yang dipakai serta menjalankan "php artisan serve --host=0.0.0.0 --port=8000"
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: '192.168.22.48',
        },
    },
});
