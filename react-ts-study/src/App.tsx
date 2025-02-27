import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useState } from 'react'

// 1、使用 JSX 时
// import Home from "@/views/home/home";
// import Template from "@/views/template";
// import Login from "@/views/login/login";
// import About from "@/views/about/about";

// 2、喜欢基于 JavaScript 对象的路由配置

import { Router } from '@/route/index'
import globalConfig from '@/config';


function App() {
    return (
        <>
            <BrowserRouter basename={globalConfig.base}>
                <Router />
                {/* <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="template" element={<Template />}></Route>
                        <Route path="about" element={<About />}></Route>
                    </Routes> */}
            </BrowserRouter>
        </>
    )
}

export default App
