/*
 * @Date: 2023-12-20 15:39:36
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-12 17:29:51
 * @descript: 文件描述
 */

import { useState } from "react";
import { Button } from 'antd';
import "./home.css";


export default function () {
    const [count, setCount] = useState(0);
    
    function onClick(params: any) {
        console.log("You clicked me!", params);
        setCount(count + 2);
    }
    return (
        <>
            <h4>主页</h4>
            <Button type="primary" onClick={onClick}> 点击- {count} </Button>
        </>
    );
}

