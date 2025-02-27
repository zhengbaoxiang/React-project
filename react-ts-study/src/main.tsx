/*
 * @Date: 2023-12-20 15:15:07
 * @LastEditors: zbx
 * @LastEditTime: 2024-04-24 10:14:55
 * @descript: 文件描述
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.less'

import App from './App'

// 貌似不支持全部引入，只能按需加载？还要插件？


import { Provider } from 'react-redux'
import store from '@/redux/index'


ReactDOM.createRoot(document.getElementById('root')!).render(
    // 这个严格模式，会使constructor 和 componentDidMount 都执行两次
    // 使用指定的 React Redux 组件 <Provider> 来  让所有容器组件都可以访问 store，
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
