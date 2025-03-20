/*
 * @Date: 2023-12-20 15:35:18
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-20 20:15:19
 * @descript: 文件描述
 */
import { useEffect, useState } from "react";
import { useRoutes, useNavigate, Navigate, useLocation } from "react-router-dom";
import axios from "axios"; // 假设使用axios进行HTTP请求
import { getUserInfo } from "@/api/system"

import routeList from "./routes";

// 假设有一个函数用于获取token
const getToken = () => {
    // 这里应该是从localStorage或其他地方获取token的逻辑
    return localStorage.getItem("token");
};

// 假设有一个函数用于获取用户权限
const getUserPermissions = async () => {
    const token = getToken();
    try {
        const response = await getUserInfo({ token: token });
        console.log("getUserInfo response:", response);
        const list = response.data?.permissions || [];
        return list;
    } catch (error) {
        console.error("Failed to fetch user permissions:", error);
        return [];
    }
};

export const Router = () => {
    const location = useLocation();

    let navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        console.log("2 token:", token);
        // 如果token存在，则认为是已认证用户
        if (!token && location.pathname !== "/login") {
            // 无 token，跳转到登录页
            navigate('/login', { replace: true });
            return;
        } else if (!token && location.pathname == "/login") {
            return
        } else if (token && location.pathname == "/login") {
            navigate('/home', { replace: true });
        } else {
            getUserPermissions().then((permissions: string[]) => {
                // 假设只要获取到权限就允许进入
                console.log("getUserPermissions permissions:", permissions);

                const hasPermission = permissions.length > 0;
                if (!hasPermission) {
                    return <Navigate to="/403" replace />; // 假设有一个无权限访问页面
                } else {
                    navigate(location.pathname, { replace: true });
                }
            });

        }
    }, [location]); // 依赖location，确保每次路由变化时都会执行

    console.log("3 location:", location);
    return useRoutes(routeList);
};