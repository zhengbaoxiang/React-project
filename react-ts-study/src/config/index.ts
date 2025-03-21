/*
 * @Date: 2023-07-17 09:59:27
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-20 19:45:59
 * @descript: 文件描述
 */

// console.log('-import.meta>', import.meta.env)

export default {
    title: '东财私信',
    enviroment: process.env.mode,
    base: process.env.base,
    // 接口路径
    baseURL: process.env.baseURL,

    serviceHost: location.origin,

    // 账密登录
    loginUrl: `${process.env.base}/login`,

    // 集团测试
    // oaLoginUrl: `http://61.152.230.36:8000/bd-cas/login?service=${process.env.serviceHost + process.env.baseURL}/User/OALogin`,
    // 集团用户正式登录地址    ?service=https://pcmp.eastmoney.com/auth/cas/casLoginFilter
    oaLoginUrl: `https://eastmoney-office.eastmoney.com/bd-cas/login?service=${process.env.serviceHost + process.env.baseURL}/User/Cor_OALogin`,
    // 非集团用户登录地址  ?service=https://pcmp.eastmoney.com/auth/securities/cas/casLoginFilter
    secLoginUrl: `https://oa-sso.18.cn/bd-cas/login?service=${process.env.serviceHost + process.env.baseURL}/User/Sec_OALogin`,
    // 登出接口
    logoutUrl: `${process.env.serviceHost + process.env.baseURL}/User/OALogOut`,

    IMApiUrl: process.env.IMAPI,
}

export const WebSocketConfig = {
    debug: false,
    appKey: process.env.appKey,
    AppSecret: process.env.AppSecret,
    apiUrl: process.env.socketApi,
    websocketUrl: process.env.websocketUrl,
}

