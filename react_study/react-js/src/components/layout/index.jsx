import React from 'react'
import { Layout, Menu, Breadcrumb, Button, Message } from '@arco-design/web-react';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { Routes, Route, Outlet, NavLink, Link } from "react-router-dom";
import "./index.less"

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

import HeaderBar from "../header"
import SiderBar from "../sider"


export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: false
        }
    }
    handleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        return (
            <Layout className="layoutCon">
                <Header className="bdr">
                    <HeaderBar></HeaderBar>
                </Header>
                <Layout className="mainCon">
                    <Sider
                        collapsed={this.state.collapsed}
                        onCollapse={this.handleCollapsed}
                        collapsible
                        trigger={this.state.collapsed ? <IconCaretRight /> : <IconCaretLeft />}
                        breakpoint='xl' theme="dark"
                        style={{ width: 200 }} className="bdg"
                    >
                        <SiderBar></SiderBar>
                    </Sider>
                    <Content className="mainContent bdy">
                        <Outlet />
                    </Content>
                </Layout>
                {/* <Footer>Footer</Footer> */}
            </Layout>
        )
    }

}
