/*
 * @Date: 2023-12-20 19:19:58
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-12 17:33:48
 * @descript: 文件描述
 */
import React from 'react';
import { Layout, Flex } from 'antd';
import { Routes, Route, Outlet, NavLink, Link } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;
import "./index.less"

import routeList from "@/routes/routes"



export default function layout() {

    // const menuList = routeList.map((item) => {
    //     return <p key={item.path}><NavLink to={item.path}>{item.meta.title}</NavLink></p>
    // })
    

    return (
        <>
            <Layout className="layoutCon">
                <Header className="hdr">
                </Header>
                <Layout className="mainCon">
                    <Sider width="250px" className="siderCon">
                        <div className="siderBar">
                            <h3 className="title center">后台项目</h3>
                            <div className="menu">
                                <p>  <Link to="/">主页</Link></p>
                                <p>  <Link to="/user">用户列表-function</Link></p>
                                <p>  <Link to="/user2">用户列表-class</Link></p>

                                {/*NavLink 动态链接 */}
                                <p>  <NavLink to="/study">学习汇总</NavLink></p>
                                <p>  <NavLink to="/template">模板页</NavLink></p>
                                <p>  <NavLink to="/alarmDetail">探针</NavLink></p>
                            </div>
                        </div>
                    </Sider>
                    <Content className="mainContent bdy">
                        <Outlet />
                    </Content>
                </Layout>
                {/* <Footer >Footer</Footer> */}
            </Layout>
        </>
    )
}

