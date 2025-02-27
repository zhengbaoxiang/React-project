/*
 * @Date: 2024-04-23 17:43:40
 * @LastEditors: zbx
 * @LastEditTime: 2024-04-25 16:00:45
 * @descript: 文件描述
 */
import request from './request'

export const handleOaToken = (data: any) => {
    return request({
        url: '/public/oaToken',
        data,
        method: 'post',
    });
};

export const handleAlarm = (data: any) => {
    return request({
        url: '/public/alarmResult/upload',
        data,
        method: 'post',
    });
};