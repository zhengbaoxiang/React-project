/*
 * @Date: 2023-07-14 14:13:43
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-20 18:22:40
 * @descript: 文件描述
 */

import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
    {
        mode: 'development',
        server: {
            host: '0.0.0.0',
            port: 8085,
            open: true,
            fs: {
                strict: false,
            },
            hmr: {
                overlay: false, // 可选：关闭 HMR 错误覆盖层
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
        base: '/front/', // 资源目录
        define: {
            'process.env': {
                "mode": "dev",
                "base": '/front/', // 路由前缀
                "baseURL": '/api',  // 接口路径
                "serviceHost": 'http://172.31.227.198:8085',
            }
        },
    }
);
