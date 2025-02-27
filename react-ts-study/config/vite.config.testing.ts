/*
 * @Date: 2024-04-24 09:49:34
 * @LastEditors: zbx
 * @LastEditTime: 2024-04-26 10:22:02
 * @descript: 文件描述
 */
import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';


export default mergeConfig(
    {
        mode: 'production',
    },
    {
        ...baseConfig,
        base: '/public/', // 资源目录
        define: {
            'process.env': {
                mode: "production",
                base: '/public/', // 路由前缀 
                "baseURL": '/api',  // 接口路径
                "serviceHost": 'emapm-aggregation-uat.dftzj.com',

            },
        },
    },
);
