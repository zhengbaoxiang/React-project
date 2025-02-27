import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'


export default defineConfig({
    base: '/',
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, '../src'),
            },
            {
                find: 'assets',
                replacement: resolve(__dirname, '../src/assets'),
            },
        ],
        extensions: ['.ts','.tsx', '.js','.jsx'],
    },
    define: {
        'process.env': {},
    },
});
