/*
 * @Date: 2023-07-14 14:13:43
 * @LastEditors: zbx
 * @LastEditTime: 2024-04-26 09:04:04
 * @descript: 文件描述
 */

import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
    {
        mode: 'development',
        server: {
            host: '172.31.227.198',
            port: 8085,
            open: true,
            fs: {
                strict: false,
            },
            proxy: {
                '/api': {
                    target: 'http://172.31.225.70:8945', //zt
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/api', '/api')
                },
            }
        },
        plugins: [
            // eslint({
            //   cache: false,
            //   include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
            //   exclude: ['node_modules'],
            // }),
        ],
    },
    {
        ...baseConfig,
        base: '/public/', // 资源目录
        define: {
            'process.env': {
                "mode": "dev",
                "base": '/public', // 路由前缀
                "baseURL": '/api',  // 接口路径
                "serviceHost": 'http://172.31.227.198:8085',
            }
        },
    }
);
