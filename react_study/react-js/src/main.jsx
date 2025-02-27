/*
 * @Date: 2023-09-19 10:43:51
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-16 14:17:44
 * @descript: 文件描述
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 貌似不支持全部引入，只能按需加载？还要插件？
// import  ArcoReact  from '@arco-design/web-react';
import { Button } from "@arco-design/web-react";

import "@arco-design/web-react/dist/css/arco.css";
import './index.css'

import { Provider } from 'react-redux'
import store from './redux/index'

ReactDOM.createRoot(document.getElementById('root')).render(
    // 这个严格模式，会使constructor 和 componentDidMount 都执行两次
    //   <React.StrictMode>
    // 使用指定的 React Redux 组件 <Provider> 来  让所有容器组件都可以访问 store，
    <Provider store={store}>
        <App />
    </Provider>,
    //   </React.StrictMode>,
)



