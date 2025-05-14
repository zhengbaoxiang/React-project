/*
 * @Date: 2023-12-20 19:19:58
 * @LastEditors: zbx
 * @LastEditTime: 2025-04-15 09:16:29
 * @descript: 布局组件

 */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useNavigate, useLocation, useResolvedPath,NavLink, Link } from "react-router-dom";
import { Layout, Flex, Menu, Avatar } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import "./index.less"

import routeList from "@/route/routes"
import { useSelector, useDispatch } from 'react-redux';


function hasPermission(permissions: string[], item: any) {

    // 没写权限点，就直接返回
    if (!item.meta.permissions || item.meta.permissions.length === 0) return true

    if (item.meta.permissions.includes('*')) return true

    // 交叉判断 access 是否 在 permissions 中
    let access = item.meta.permissions;
    return access.some((perm: string) => permissions.includes(perm));

}

const MyLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [currentMenu, setCurrentMenu] = useState<string[]>(['home'])
    const location = useLocation();
    useEffect(() => {
        console.log('layout-location', location)
        if (location.pathname === '/') {
            setCurrentMenu(['home'])
        } else {
            // 拿到当前路由的路径，然后切割成数组，去掉空字符串，作为菜单选中项
            const keys = location.pathname.split('/').filter(Boolean)
            console.log('keys', keys)
            setCurrentMenu(keys)
        }
    }, [location])

    // 从全局store拿到当前用户的权限点
    // const permissions = ['admin','user','study','tanzhen']
    const permissions = useSelector((state: { permissions: string[] }) => {
        console.log('layout-state', state)
        return state.permissions
    })


    const getMenuList = (routeList: any) => {
        if (!routeList) return null

        // 过滤掉隐藏的菜单
        routeList = routeList.filter((item: any) => !item.meta.hideInMenu)

        // 过滤掉需要权限的菜单，假设权限点列表 permissions
        routeList = routeList.filter((item: any) => {
            return hasPermission(permissions, item)
        })


        return routeList.map((item: any) => {
            const icon = item.meta.icon
            return {
                key: `${item.name}`,
                label: `${item.meta.title}`,
                icon: icon ? React.createElement(icon) : null,
                children: getMenuList(item.children)
            }
        })
    }
    const menuList: MenuProps['items'] = getMenuList(routeList)

    const navigate = useNavigate();
    // 以编程方式导航
    const menuItemClick = (item: any) => {
        let path ='/' + item.keyPath.reverse().join('/');
        console.log(item,path)
        navigate(path);
    }

    return (
        <>
            <Layout className="layoutCon">
                <Sider theme="light" width="250px" className="siderCon" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
                    <div className="siderBar">
                        <h3 className="title center" style={{ height: '50px', margin: 0, lineHeight: '50px' }}>React项目</h3>
                        <Menu
                            theme="light"
                            mode="inline"
                            defaultSelectedKeys={currentMenu}
                            defaultOpenKeys={['/']}
                            style={{ flex: 1, minWidth: 0 }}
                            items={menuList}
                            onClick={menuItemClick}
                        />
                        {/* <div className="menu">
                            <p>  <Link to="/">主页</Link></p>
                            <p>  <Link to="/user">用户列表-function</Link></p>
                            <p>  <Link to="/user2">用户列表-class</Link></p>
                            <p>  <NavLink to="/study">学习汇总</NavLink></p>
                            <p>  <NavLink to="/template">模板页</NavLink></p>
                            <p>  <NavLink to="/alarmDetail">探针</NavLink></p>
                        </div> */}
                    </div>
                </Sider>
                <Layout className="mainCon">
                    <Header className="hdr" style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Header>
                    <Content className="mainContent bdy">
                        {/* 子路由 */}
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default MyLayout

