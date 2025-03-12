/*
 * @Date: 2023-12-20 15:35:18
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-12 16:35:29
 * @descript: 文件描述
 */
// npm install react-router-dom@6 history@5
import { useRoutes } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

import routeList from "./routes";



export const Router = () => {
    return useRoutes(routeList)
}