/*
 * @Date: 2023-09-19 14:02:55
 * @LastEditors: zbx
 * @LastEditTime: 2023-10-17 15:47:44
 * @descript: 文件描述
 */
import { useState, Suspense, lazy } from 'react';


const Home =lazy (()=>import("@/views/home") )
const User =lazy (()=>import("@/views/user") )


export default [
    {
        // index:true,  // 索引路由可以被认为是“默认子路由”
        path: '/home',
        name: 'home',
        meta: {
            title:'主页2'
        },
        element: <Suspense fallback={<></>}><Home /> </Suspense>
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title:'用户列表'
        },
        element:<Suspense fallback={<></>}><User /> </Suspense>
    },
]