/*
 * @Date: 2023-12-20 15:35:59
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-12 17:37:12
 * @descript: 文件描述
 */
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button, List } from 'antd';


export default function () {

    const navigate = useNavigate();
    function btnClick() {
        console.log('click');
        // 以编程方式导
        navigate('/')
    }

    return (
        <div className='center' style={{ padding: "1rem " }}>
            <Button onClick={btnClick}>返回主页</Button>
            <p><Link to="/">返回主页</Link></p>
        </div>
    );
}

