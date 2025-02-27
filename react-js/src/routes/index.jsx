/*
 * @Date: 2023-09-19 11:11:24
 * @LastEditors: zbx
 * @LastEditTime: 2023-09-26 09:39:39
 * @descript: 文件描述
 */
import { useState, Suspense, lazy } from 'react';
import { useRoutes,BrowserRouter, Routes, Route, Link } from "react-router-dom";

import routes from "./routes";
import Layout from "@/components/layout";
import About from "@/views/about/about.jsx";
// import Template from "@/views/template/index";
const Template =lazy (()=>import("@/views/template/index.jsx") )
const Login =lazy (()=>import("@/views/login/login.jsx") )



const routeList =  [
    {
        path: '/',
        name: '',
        element: <Layout />,
        meta: {
            title:'主页1'
        },
        children:routes
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title:'登录页',
            hideInMenu:true
        },
        element:<Suspense fallback={<></>}><Login /> </Suspense>  
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            title:'关于'
        },
        element: <About />
    },
    {
        path: '/template',
        name: 'template',
        meta: {
            title:'模板页'
        },
        element: <Suspense fallback={<></>}><Template /> </Suspense>
    },
    {
        path: "*",
        name: 'notfound',
        meta: {
            title:'404'
        },
        element: <main style={{ padding: "1rem" }}><p>404 not found</p></main>
    },
]
export default routeList



export const Router = ()=>{
    return  useRoutes(routeList)
}
