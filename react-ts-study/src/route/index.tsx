/*
 * @Date: 2023-12-20 15:35:18
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-20 20:01:46
 * @descript: 文件描述
 */
import { useEffect, useState } from "react";
import { useRoutes, Navigate, useLocation } from "react-router-dom";
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
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user permissions:", error);
        return [];
    }
};

export const Router = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    console.log("1 location:", location);
    useEffect(() => {
        const token = getToken();
        console.log("2 token:", token);
        // 如果token存在，则认为是已认证用户
        if (!token) {
            setIsAuthenticated(false);
            return;
        } else {
            setIsAuthenticated(false);
        }
    }, [location]); // 依赖location，确保每次路由变化时都会执行


    console.log("3 isAuthenticated:", isAuthenticated);

    if (!isAuthenticated && location.pathname !== "/login") {
        return <Navigate to="/login" replace />;
    } else if (!isAuthenticated && location.pathname == "/login") {
        return useRoutes(routeList);
    } else if (isAuthenticated && location.pathname == "/login") {
        return <Navigate to="/home" replace />;
    } else {
        getUserPermissions().then(permissions => {
            // 假设只要获取到权限就允许进入
            console.log("getUserPermissions permissions:", permissions);
            setHasPermission(true);
            if (!hasPermission) {
                return <Navigate to="/403" replace />; // 假设有一个无权限访问页面
            } else {
                return useRoutes(routeList);
            }
        });
    }
    return useRoutes(routeList);
};