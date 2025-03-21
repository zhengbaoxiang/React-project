/*
 * @Date: 2025-03-20 19:34:26
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-21 10:11:10
 * @descript: 文件描述
 */
import request from './request'

export const getUserInfo = (data: any) => {
    // return request({
    //     url: '/sys/getUserInfo',
    //     data,
    //     method: 'post',
    // });
    return Promise.resolve({
        code: 200,
        data: {
            name: 'zbx',
            age: 18,
            role: 'admin',
            permissions: ['admin','study','tanzhen'],
        },
    });
};

export const login = (data: any) => {
    return request({
        url: '/sys/login',
        data,
        method: 'post',
    });
};