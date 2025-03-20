/*
 * @Date: 2023-09-19 13:09:49
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-20 19:59:24
 * @descript: 文件描述
 */
import { useNavigate } from "react-router-dom";
import "./index.less"

import { Button } from 'antd';

export default function () {

    let navigate = useNavigate();

    function loginClick() {
        console.log('click');
        localStorage.setItem("token", 'fakeToken');
        navigate('/')
    }

    return (
        < >
            <div className="loginCon">
                <h1>login页</h1>
                <Button onClick={loginClick}>登录成功跳转</Button>
            </div>
        </>
    )
}
