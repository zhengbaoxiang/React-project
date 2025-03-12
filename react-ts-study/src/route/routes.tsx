/*
 * @Date: 2023-12-20 19:53:11
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-12 17:33:03
 * @descript: 文件描述
 */
import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";



import Layout from "@/components/layout";
// import Home from "@/views/home/home";

// 懒加载  lazy()配合Suspense使用，可以实现路由的懒加载
const Home = lazy(() => import("@/views/home/home"))
const Login = lazy(() => import("@/views/login/login"))

const Template = lazy(() => import("@/views/template"))
const Study = lazy(() => import("@/views/study/study"))


const User = lazy(() => import("@/views/user/user"))
const User2 = lazy(() => import("@/views/user/user-class"))

const AlarmDetail = lazy(() => import("@/views/tanzhen/alarmDetail"))

export default [
    {
        path: '/',
        name: '_home',
        element: <Layout />,
        meta: {
            title: '主页'
        },
        children: [
            {
                // 注意，它有' index '属性而不是' path '。
                // 这是因为索引路由共享父路由的路径。这就是重点——它没有路径。
                // index:true,  // 索引路由可以被认为是“默认子路由”,使用索引路由，则不要设置path
                path: '/',
                name: 'home',
                meta: {
                    title: '主页'
                },
                element: <Suspense fallback={<></>}><Home /> </Suspense>
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户列表-function'
                },
                element: <Suspense fallback={<></>}><User /> </Suspense>
            },

            {
                path: '/user2',
                name: 'user2',
                meta: {
                    title: '用户列表-class'
                },
                element: <Suspense fallback={<></>}><User2 /> </Suspense>
            },
            {
                path: '/study',
                name: 'study',
                meta: {
                    title: '学习汇总'
                },
                element: <Suspense fallback={<></>}><Study /> </Suspense>
            },
            {
                path: '/template',
                name: 'template',
                meta: {
                    title: '模板页'
                },
                element: <Suspense fallback={<></>}><Template /> </Suspense>
            },
        ]
    },
    {
        path: '/alarmDetail',
        name: 'alarmDetail',
        meta: {
            title: '探针'
        },
        element: <Suspense fallback={<></>}><AlarmDetail /> </Suspense>
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录页',
            hideInMenu: true
        },
        element: <Suspense fallback={<></>}><Login /> </Suspense>
    },
    {
        path: "*",
        name: 'notfound',
        meta: {
            title: '404'
        },
        element: <main style={{ padding: "1rem" }}><p>404 not found</p></main>
    },


]