/*
 * @Date: 2023-09-19 13:09:49
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-21 17:30:04
 * @descript: 文件描述
 */
import { useNavigate } from "react-router-dom";
import "./index.less"

import { Button } from 'antd';

export default function () {

    let navigate = useNavigate();
    function loginClick() {
        console.log('click');
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
