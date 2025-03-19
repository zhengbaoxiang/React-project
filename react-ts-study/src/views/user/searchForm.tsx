/*
 * @Date: 2025-03-17 09:51:26
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-19 18:58:14
 * @descript: 查询表单，统一一个查询参数传出去即可
 */
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Space } from 'antd';

import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;


interface searchFormProps {
    onLookup: (params:any) => void;
    from?:string;
}
const SearchForm = (props: searchFormProps) => {

     // 查询表单
     const initialValues = {
        userNo: '',
        username: '',
        role: '',
        startDate: '',
        endDate: '',
    }
     const [searchForm] = Form.useForm()

    //  其它选项change事件
    const onRoleChange = (value: any) => {
        console.log(value)
    }

     const onReset = () => {
         searchForm.resetFields();
         props.onLookup({})
     }
     const onLookup = () => {
         const values = searchForm.getFieldsValue();
         props.onLookup(values)
     }

    return (
        <div className="searchForm" style={{ marginBottom: "20px" }}>
                <Form
                    form={searchForm}
                    initialValues={initialValues}
                    layout={"inline"}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Form.Item name="username" label="姓名" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="userNo" label="账号" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="角色" rules={[{ required: false }]}>
                        <Select
                            style={{ width: "120px" }}
                            onChange={onRoleChange}
                            allowClear
                        >
                            <Option value="admin">管理员</Option>
                            <Option value="user">普通用户</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <Space>
                            <Button type="primary" onClick={onLookup}> 查询 </Button>
                            <Button htmlType="button" onClick={onReset}> 重置  </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
    )



}

export default SearchForm;