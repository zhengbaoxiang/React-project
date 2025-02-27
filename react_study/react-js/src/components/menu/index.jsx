/*
 * @Date: 2023-09-19 13:14:30
 * @LastEditors: zbx
 * @LastEditTime: 2023-09-26 14:08:18
 * @descript: 文件描述
 */
import { Layout, Menu, Breadcrumb, Button, Message } from '@arco-design/web-react';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';

import { Routes, Route, Outlet, NavLink, Link, useNavigate } from "react-router-dom";

import routeList from '@/routes/index.jsx'


const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default function () {
    const navigate = useNavigate();

    const defaultOpenKeys = ['1']
    const defaultSelectedKeys = ['0_3']

    function generateMenuList(routeList) {
        function travel(list) {
            let menuList = []
            // 需要过滤\递归等
            menuList = list.map(item => {
                if(item.meta.hideInMenu){
                    return null
                }
                let element = null
                if (item.children && item.children.length > 0) {
                    const subMenuList = travel(item.children)
                    element = (
                        <SubMenu
                            key={item.path}
                            title={<span><IconCalendar className='mr12'/>{item.meta.title}</span>}
                        >{subMenuList}
                        </SubMenu>)
                } else {
                    element = <MenuItem key={item.path || item.name}><IconCalendar className='mr12' />{item.meta.title}</MenuItem>
                }
                return element
            })

            return menuList
        }
        return travel(routeList)
    }
    const menuList = generateMenuList(routeList)

    function menuClick(key) {
        Message.info({
            content: `You select ${key}`,
            showIcon: true,
        })
        console.log(`You select ${key}`);
        navigate(key)
    }
    

    return (
        <Menu
            theme="dark"
            mode="vertical"
            style={{ width: '100%' }}
            onClickMenuItem={(key) => menuClick(key)}
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={defaultSelectedKeys}

        >
            {menuList}
            {/* 
            <MenuItem key='0_2'>
                <IconCalendar />
                Menu 2
            </MenuItem>
            <SubMenu  key='1'  title={ <span>
                <IconCalendar />Navigation 1
                </span> }
            >
                <MenuItem key='1_1'>Menu 1</MenuItem>
                <MenuItem key='1_2'>Menu 2</MenuItem>
                <SubMenu key='1_3' title='Navigation 2'>
                    <MenuItem key='1_3_1'>1_3_1</MenuItem>
                    <MenuItem key='1_3_2'>1_3_2</MenuItem>
                </SubMenu>
                <SubMenu key='1_4' title='Navigation 3'>
                    <MenuItem key='1_4_1'>1_4_1</MenuItem>
                    <MenuItem key='1_4_2'>1_4_2</MenuItem>
                    <MenuItem key='1_4_3'>1_4_3</MenuItem>
                </SubMenu>
            </SubMenu> */}
        </Menu>

    )
}
