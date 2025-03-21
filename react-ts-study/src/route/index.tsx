/*
 * @Date: 2023-12-20 15:35:18
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-21 18:00:49
 * @descript: 文件描述
 */
import { useEffect, useState } from "react";
import { useRoutes, useNavigate, Navigate, useLocation } from "react-router-dom";
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
        console.log("4 getUserInfo response:", response);
        const list = response.data?.permissions || [];
        return list;
    } catch (error) {
        console.error("Failed to fetch user permissions:", error);
        return [];
    }
};
// 根据path,找出routeList中对应的路由配置信息
function hasPermission(path: string,permissions:string[]) {
    const pathList = path.split("/").filter(Boolean); // 过滤掉空字符串
    console.log("6 pathList:", pathList);


    return true
   
}




export const Router = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [permissions, setPermissions] = useState<string[]>([]);
    const [hasAuth, setHasAuth] = useState<boolean>(false)

    // 每次进入页面刷新页面，跳转页面都会运行到这
    console.log("1 location:", location);

    useEffect(() => {
        const token = getToken();
        console.log("3 token:", token);
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
                console.log("5 getUserPermissions permissions:", permissions);
                setPermissions(permissions);

               const hasPer =  hasPermission(location.pathname, permissions)

                if (!hasPer) {
                    navigate('/403', { replace: false });
                }
            });

        }
    }, [location]); // 依赖location，确保每次路由变化时都会执行

    console.log("2 location:", location);
    return useRoutes(routeList);
};