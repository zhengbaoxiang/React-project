/*
 * @Date: 2023-09-19 10:43:51
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-20 15:52:06
 * @descript: 文件描述
 */
import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{
            find: '@', replacement: resolve(__dirname, './src'),
        }]
    }
})
