/*
 * @Date: 2023-11-07 15:07:14
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-18 16:54:22
 * @descript: 文件描述
 */
import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

import { Table, Card, PaginationProps, Space, Typography, } from '@arco-design/web-react';
import { Form, Input, Select, DatePicker, Button, Grid, } from '@arco-design/web-react';
import { Modal, Message } from '@arco-design/web-react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';


import styles from './style/index.module.less';
import LineGeom from 'bizcharts/lib/geometry/Line';


const { Row, Col } = Grid;
const { useForm } = Form;
const ContentType = ['图文', '横版短视频', '竖版短视频'];
const Status = ['未上线', '已上线'];

function Temp() {

    // 搜索表单区域
    // 可以使用Form.useForm获取表单实例。 也可以使用 ref 获取表单实例。
    //  form === formRef.current
    // 通过该实例调用表单方法，例如设置表单字段值，重置表单等。
    const [form] = useForm();
    const formRef = useRef();

    const colSpan = 6

    const handleSubmit = () => {
        const values = form.getFieldsValue();
        handleSearch(values)
    };
    const handleReset = () => {
        form.resetFields();
        const values = form.getFieldsValue();
        handleSearch(values)
    };

    // 动态组件
    let [someBtn, setSomeBtn] = useState(null);
    const selChange = (v) => {
        console.log('selChange', v)
        if (v) {
            someBtn = <Button>上线</Button>
        } else {
            someBtn = <Button>下线</Button>
        }
        console.log('someBtn', someBtn)
        setSomeBtn(someBtn)
    }


    const columns = [{
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Salary',
        dataIndex: 'salary',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: '操作',
        dataIndex: 'op',
        render: (_, record) => (
            <Button
                type='primary' status='danger'
                onClick={() => { toEdit(record) }}
            >编辑</Button>
        )
    }
    ]

    const [data, setData] = useState([]);
    const [pagination, setPatination] = useState({
        sizeCanChange: true,
        showTotal: true,
        pageSize: 10,
        current: 1,
        pageSizeChangeResetCurrent: true,
    });
    const [formParams, setFormParams] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('useEffect-1', form, formParams)
        fetchData()
    }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)])

    function fetchData() {
        const { current, pageSize } = pagination;
        setLoading(true);
        const params = {
            page: current,
            pageSize,
            ...formParams,
        }
        // 调接口 apiName(params).then(res=>{ 
        const list = [{
            id: '1',
            name: 'Jane Doe',
            salary: 23000,
            address: '32 Park Road, London',
            email: 'jane.doe@example.com',
        },
        {
            id: '2',
            name: 'Alisa Ross',
            salary: 25000,
            address: '35 Park Road, London',
            email: 'alisa.ross@example.com',
        },
        {
            id: '3',
            name: 'Kevin Sandra',
            salary: 22000,
            address: '31 Park Road, London',
            email: 'kevin.sandra@example.com',
        },
        {
            id: '4',
            name: 'Ed Hellen',
            salary: 17000,
            address: '42 Park Road, London',
            email: 'ed.hellen@example.com',
        },
        {
            id: '5',
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
        },]
        setData(list)
        setPatination({
            ...pagination,
            current,
            pageSize,
            total: 108,
        })
        setLoading(false);
        // })

    }

    function handleSearch(params) {
        console.log('params', params)

        setPatination({ ...pagination, current: 1 })
        setFormParams(params);
    }

    function onChangeTable({ current, pageSize }) {
        setPatination({
            ...pagination,
            current,
            pageSize
        })
    }


    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [pageForm] = useForm()

    function toAdd() {
        pageForm.resetFields()
        pageForm.setFieldsValue({
            id: 0,
            name: '新增name',
            date: new Date()
        })
        setVisible(true)
    }
    function toEdit(r) {
        pageForm.resetFields()
        pageForm.setFieldsValue({
            ...r,
            contentType: [1, 2]
        })
        setVisible(true)

    }

    const onValuesChange = (changeValue, values) => {
        console.log('onValuesChange: ', changeValue, values);
    };
    const onChange = (changeValue, values) => {
        console.log('onChange: ', changeValue, values);
    };

    const confirmPage = () => {
        pageForm.validate().then(res => {
            setConfirmLoading(true);

            setTimeout(() => {
                Message.success('操作成功')
                setConfirmLoading(false)
                setVisible(false)

                console.log('pageForm', pageForm.getFieldsValue())
            }, 500);
        })
    }


    return (
        <>
            <Card>
                <div className={styles['search-form-wrapper']}>
                    <Form
                        form={form}
                        ref={formRef}
                        className={styles['search-form']}
                        labelAlign="left"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        <Row gutter={24}>
                            <Col span={colSpan}>
                                <Form.Item label='集合编号' field="id">
                                    <Input
                                        allowClear
                                        placeholder='请输入'
                                    />
                                </Form.Item></Col>
                            <Col span={colSpan}>
                                <Form.Item label='集合名称' field="name">
                                    <Input
                                        allowClear
                                        placeholder='请输入'
                                    />
                                </Form.Item></Col>
                            <Col span={colSpan}> <Form.Item
                                label='内容体裁'
                                field="contentType"
                            >
                                <Select
                                    placeholder='请选择'
                                    options={ContentType.map((item, index) => ({
                                        label: item,
                                        value: index,
                                    }))}
                                    mode="multiple"
                                    allowClear
                                />
                            </Form.Item></Col>
                            <Col span={colSpan}>
                                <Form.Item label="状态" field="status">
                                    <Select
                                        placeholder='请选择'
                                        onChange={selChange}
                                        options={Status.map((item, index) => ({
                                            label: item,
                                            value: index,
                                        }))}
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={colSpan}><Form.Item
                                label="创建时间"
                                field="createdTime"
                            >
                                <DatePicker.RangePicker
                                    allowClear
                                    style={{ width: '100%' }}
                                    disabledDate={(date) => dayjs(date).isAfter(dayjs())}
                                />
                            </Form.Item></Col>
                        </Row>

                    </Form>
                    <div className={styles['right-button']}>
                        <Button type="primary" icon={<IconSearch />} onClick={handleSubmit}>
                            查询
                        </Button>
                        <Button icon={<IconRefresh />} onClick={handleReset}>
                            重置
                        </Button>
                    </div>

                </div>
                <div className={styles['button-group']}>
                    <Space>
                        <Button type='primary' status='warning' onClick={toAdd}>
                            新增
                        </Button>
                    </Space>
                    <Space>
                        <Button type='primary' status='success'>
                            导出
                        </Button>
                    </Space>
                    <Space>
                        {someBtn}
                    </Space>
                </div>
                <Table
                    rowKey="id"
                    loading={loading}
                    onChange={onChangeTable}
                    pagination={pagination}
                    columns={columns}
                    data={data}
                />
            </Card>

            <Modal
                title={pageForm.getFieldValue('id') ? '编辑' : '新增'}
                visible={visible}
                confirmLoading={confirmLoading}
                onOk={confirmPage}
                onCancel={() => { setVisible(false) }}
                style={{ width: '800px' }}
            >
                <Form
                    form={pageForm}
                    labelAlign="right"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                    onValuesChange={onValuesChange}
                    onChange={onChange}

                >
                    <Form.Item label='集合id' field="id"
                        style={{ width: '350px' }}
                    >
                        <Input
                            allowClear
                            placeholder='请输入'
                        />
                    </Form.Item>

                    <Form.Item label='集合名称' field="name"
                        style={{ width: '350px' }}
                    >
                        <Input
                            allowClear
                            placeholder='请输入'
                        />
                    </Form.Item>
                    <Form.Item label='邮箱' field="email"
                        style={{ width: '350px' }}
                    >
                        <Input
                            allowClear
                            placeholder='请输入'
                        />
                    </Form.Item>
                    <Form.Item label='地址' field="address"
                        style={{ width: '350px' }}
                    >
                        <Input
                            allowClear
                            placeholder='请输入'
                        />
                    </Form.Item>
                    <Form.Item
                        label='内容体裁'
                        field="contentType"
                        style={{ width: '350px' }}
                    >
                        <Select
                            placeholder='请选择'
                            options={ContentType.map((item, index) => ({
                                label: item,
                                value: index,
                            }))}
                            mode="multiple"
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item label='日期' field='date' rules={[{ required: true }]}
                        style={{ width: '350px' }}
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                </Form>

            </Modal>

        </>
    )


}

export default Temp