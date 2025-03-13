import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useState } from 'react'
// 修改主题变量
import { ConfigProvider } from 'antd';

// 1、使用 JSX 时
// import Home from "@/views/home/home";
// import Template from "@/views/template";
// import Login from "@/views/login/login";
// import About from "@/views/about/about";

// 2、喜欢基于 JavaScript 对象的路由配置

import { Router } from '@/route/index'
import globalConfig from '@/config';
import zhCN from 'antd/locale/zh_CN';

const App: React.FC = () => {
    return (
        <>
            <ConfigProvider
                locale={zhCN}
                theme={{
                    token: {
                        // Seed Token，影响范围大
                        borderRadius: 8,
                        colorInfo: '#ff9900',
                        colorLink: '#ff9900',
                        colorPrimary: '#ff9900',
                        

                        // 派生变量，影响范围小
                        colorPrimaryActive: '#ff9966',
                        // colorBgSolidHover: '#ff9966',
                        // colorBgContainer: '#f6ffed',
                        colorPrimaryBorderHover: 'red', // 设置按钮鼠标悬浮边框颜色
                    },
                }}
            >

                <BrowserRouter basename={globalConfig.base}>
                    <Router />
                    {/* <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="template" element={<Template />}></Route>
                        <Route path="about" element={<About />}></Route>
                    </Routes> */}
                </BrowserRouter>
            </ConfigProvider>

        </>
    )
}

export default App
