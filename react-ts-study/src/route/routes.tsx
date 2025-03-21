/*
 * @Date: 2023-12-20 19:53:11
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-21 17:48:33
 * @descript: 文件描述
 */
import { Suspense, lazy } from "react"


import Layout from "@/components/layout";
// import Home from "@/views/home/home";

// 懒加载  lazy()配合Suspense使用，可以实现路由的懒加载,懒加载在无法开发时，实时更新
const Home = lazy(() => import("@/views/home/home"))
const Login = lazy(() => import("@/views/login/login"))

const Template = lazy(() => import("@/views/template"))
// const Study = lazy(() => import("@/views/study/study"))
// const User = lazy(() => import("@/views/user/user"))
// const User2 = lazy(() => import("@/views/user/user-class"))
const AlarmDetail = lazy(() => import("@/views/tanzhen/alarmDetail"))


import Study from "@/views/study/study";
import User from "@/views/user/user"
import User2 from "@/views/user/user-class"

import { HomeOutlined, UserOutlined } from '@ant-design/icons';

interface RouteMeta {
    title: string;
    // options
    requiresAuth?: boolean; //  login
    permissions?: string[]; // 权限点
    icon?: string;
    // menu select key
    menuSelectKey?: string;
    hideInMenu?: boolean;
}

export default [
    {
        path: '/',
        name: '/',
        element: <Layout />,
        meta: {
            title: '主页',
            icon: HomeOutlined
        },
        children: [
            {
                // 注意，它有' index '属性而不是' path '。
                // 这是因为索引路由共享父路由的路径。这就是重点——它没有路径。
                // index:true,  // 索引路由可以被认为是“默认子路由”,使用索引路由，则不要设置path
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页',
                },
                element: <Suspense fallback={<></>}><Home /> </Suspense>
            },
            {
                path: 'study',
                name: 'study',
                meta: {
                    title: '学习汇总',
                    permissions: ['*']

                },
                element: <Suspense fallback={<></>}><Study /> </Suspense>
            },
            {
                path: 'template',
                name: 'template',
                meta: {
                    title: '模板页',
                    permissions: ['admin'],
                    // hideInMenu: true
                },
                element: <Suspense fallback={<></>}><Template /> </Suspense>
            },
        ]
    },
    {
        path: '/sys',
        name: 'sys',
        element: <Layout />,
        meta: {
            title: '系统管理',
        },
        children: [
            {
                path: 'user',
                name: 'user',
                meta: {
                    title: '用户列表-function',
                    icon: UserOutlined,
                    permissions: ['user']
                },
                element: <Suspense fallback={<></>}><User /> </Suspense>
            },
            {
                path: 'user2',
                name: 'user2',
                meta: {
                    title: '用户列表-class',
                    icon: UserOutlined,
                    permissions: ['user']

                },
                element: <Suspense fallback={<></>}><User2 /> </Suspense>
            },
        ]
    },
    {
        path: '/alarmDetail',
        name: 'alarmDetail',
        meta: {
            title: '探针',
            permissions: ['tanzhen'],
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
        path: "/403",
        name: '403',
        meta: {
            title: '403',
            hideInMenu: true
        },
        element: <main style={{ padding: "1rem" }}><p>没有权限查看</p></main>
    },
    {
        path: "*",
        name: 'notfound',
        meta: {
            title: '404',
            hideInMenu: true
        },
        element: <main style={{ padding: "1rem" }}><p>404 not found</p></main>
    },


]