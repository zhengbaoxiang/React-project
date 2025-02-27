/*
 * @Date: 2023-12-20 15:35:18
 * @LastEditors: zbx
 * @LastEditTime: 2024-04-29 14:00:02
 * @descript: 文件描述
 */
// npm install react-router-dom@6 history@5
import { Suspense, lazy } from "react"
import { useRoutes } from "react-router-dom";
// import { BrowserRouter, Routes, Route, Link,NavLink } from "react-router-dom";


// import Layout from "@/components/layout";
// import routes from "./routes";
// import Home from "@/views/home/home";
// // import Template from "@/views/template";
// const Template = lazy(() => import("@/views/template"))

// const Login = lazy(() => import("@/views/login/login"))
// const About = lazy(() => import("@/views/about/about"))

const AlarmDetail = lazy(() => import("@/views/alarmDetail"))
// import AlarmDetail from "@/views/alarmDetail";


const routeList: any[] = [
    {
        path: '/alarmDetail',
        name: 'alarmDetail',
        meta: {
            title: '探针'
        },
        element: <Suspense fallback={<></>}><AlarmDetail /> </Suspense>
    },
    // {
    //     path: '/',
    //     name: '_home',
    //     element: <Layout />,
    //     meta: {
    //         title: '主页'
    //     },
    //     children:routes
    // },
    // {
    //     path: '/login',
    //     name: 'login',
    //     meta: {
    //         title: '登录页',
    //         hideInMenu: true
    //     },
    //     element: <Suspense fallback={<></>}><Login /> </Suspense>
    // },
    // {
    //     path: '/about',
    //     name: 'about',
    //     meta: {
    //         title: '关于'
    //     },
    //     element: <Suspense fallback={<></>}> <About /> </Suspense>
    // },
    // {
    //     path: '/template',
    //     name: 'template',
    //     meta: {
    //         title: '模板页'
    //     },
    //     element: <Suspense fallback={<></>}><Template /> </Suspense>
    // },
    {
        path: "*",
        name: 'notfound',
        meta: {
            title: '404'
        },
        element: <main style={{ padding: "1rem" }}><p>404 not found</p></main>
    },


]
export default routeList

export const Router = () => {
    return useRoutes(routeList)
}