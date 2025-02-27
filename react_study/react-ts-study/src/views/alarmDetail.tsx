/*
 * @Date: 2024-04-19 16:46:06
 * @LastEditors: zbx
 * @LastEditTime: 2024-04-29 13:37:49
 * @descript: 文件描述
 */
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import type { DatePickerProps } from 'antd';
import { message } from "antd"  ;
const { TextArea } = Input;

import { useNavigate, useLocation, useMatch, useParams } from 'react-router-dom';

import logo from '@/assets/logo.png'
import "./alarmDetail.less"
import { handleAlarm, handleOaToken } from '@/api/alarm';

const HandleForm: React.FC = () => {
    const [form] = Form.useForm();
    const [fixTime, setFixTime] = useState('');
    const [token, setToken] = useState('');

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'This is a success message',
      });
    };

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const alarmId = searchParams.get('alarmId');
    const oaToken = searchParams.get('oa_token');
    console.log(oaToken)

    useEffect(() => {
        initData()
    }, [])



    const initData = () => {
        const today = dayjs(new Date());
        form.setFieldValue('fixTime', today)
        setFixTime(today.format('YYYY-MM-DD'))

        handleToken()

    }
    const handleToken = () => {
        const params = {
            oaToken: oaToken,
        }
        handleOaToken(params).then(res => {
            console.log(res)
            setToken(res?.data)
        })
    }
    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        setFixTime(dateString)
    };

    const submit = (e: any) => {
        const params = {
            ...form.getFieldsValue(),
            fixTime: fixTime,
            token: token,
            alarmId: alarmId,
        }
        console.log('参数', params)
        handleAlarm(params).then(res => {
            console.log(res)
            message.success('提交成功')
        })
    }

    return (
        <div className="detailCon">
            <div className='imgCon'>
                <img src={logo} className="logo react " alt="logo" />
            </div>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={submit}
            >
                <Form.Item name="fixer" label="告警处理人" rules={[{ required: true, message: '请输入' }]} >
                    <Input />
                </Form.Item>
                <Form.Item name="department" label="责任部门" rules={[{ required: true, message: '请输入' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="reasonType" label="原因分类" rules={[{ required: true, message: '请选择' }]}>
                    <Select>
                        <Select.Option value="1">前端</Select.Option>
                        <Select.Option value="2">后端</Select.Option>
                        <Select.Option value="3">运维</Select.Option>
                        <Select.Option value="4">配置</Select.Option>
                        <Select.Option value="5">其他</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="fixTime" label="计划修复时间" rules={[{ required: true, message: '请选择' }]}>
                    <DatePicker onChange={onDateChange} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="result" label="处理结果">
                    <TextArea rows={6} />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
                    <Button style={{ width: '100%' }} type="primary" size="large" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default () => <HandleForm />;