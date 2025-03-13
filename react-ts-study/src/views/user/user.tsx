/*
 * @Date: 2023-12-20 17:41:05
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-13 18:04:20
 * @descript: 文件描述
 */
import "./user.css";
import { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { Space } from 'antd';


import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Select, } from 'antd';
const { Option } = Select;


import type { TableProps } from 'antd';
import { Table, Tag, Tooltip } from 'antd';

import { Modal } from "antd";


type FieldType = {
    userNo: string;
    username: string;
    role: string;
    password: string;
}



export default function () {
    // 状态管理，必须用setCount来改变count的值,否则不会触发重新渲染
    let [count, setCount] = useState(0);
    const btnClick = () => {
        setCount(count + 1)
    }
    // 有依赖的useEffect，相当于 Vue watch
    useEffect(() => {
        console.log('渲染触发', 'count变化后触发', count);
        return () => {
        }
    }, [count])

    // 相当于 Vue mounted
    useEffect(() => {
        console.log('只挂载时触发一次');
        getTableList({})
    }, [])
    // 类似 Vue updated(){}
    useEffect(() => {
        console.log('更新时触发');
    });

    // 查询表单
    const [searchForm] = Form.useForm()
    const initialValues = {
        userNo: '',
        username: '',
        role: '',
        startDate: '',
        endDate: '',
    }
    const onReset = () => {
        searchForm.resetFields();
    }
    const onLookup = () => {
        const values = searchForm.getFieldsValue();
        console.log('Received values of form: ', values);
        setSearchParams(values)
        setPageInfo({
            current: 1,
            pageSize: 10,
        })
        // 查询表格数据
        getTableList()
    }

    type DataSourceType = {
        userNo: number;
        username: string;
        role: string;
        description?: string;
        key?: string;
    }
    const [searchParams, setSearchParams] = useState<any>({})
    const [tableData, setTableData] = useState<Array<any>>([])
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
    })
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    const tableColumns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: 60,
            render: (text: any, record: any, index: number) => {
                return index + 1
            }
        },
        {
            title: '工号',
            dataIndex: 'userNo',
            width: 150,
            sorter: (a: DataSourceType, b: DataSourceType) => a.userNo - b.userNo,
        },
        {
            title: '姓名',
            dataIndex: 'username',
        },
        {
            title: '角色',
            dataIndex: 'role',
            render: (text: any, record: any, index: number) => {
                return <Tag color={text === 'admin' ? 'red' : 'green'}>{text}</Tag>
            }
        },
        {
            title: '描述',
            dataIndex: 'description',
            // ellipsis: true,
            ellipsis: {
                showTitle: false,
            },
            render: (description: string) => (
                <Tooltip placement="topLeft" title={description}>
                    {description}
                </Tooltip>
            ),
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (_: any, record: DataSourceType) => (
                <Space size="small">
                    <Button onClick={(e)=>{e.stopPropagation(),editClick(record)}} type="text" size='small'>编辑</Button>
                    <Button onClick={(e)=>{e.stopPropagation(),deleteClick(record)}} type="text" danger size='small'>删除</Button>
                </Space>
            ),
        },
    ]

    // 获取表格数据
    const getTableList = (others = {}) => {
        const params = {
            ...searchParams,
            ...pageInfo,
            ...others,
        }
        console.log('查询', params);

        // 调用api接口
        const dataSource: DataSourceType[] = [
            {
                userNo: 42,
                username: '胡彦斌',
                role: 'admin',
                description: '西湖区湖底公园1号',
            },
            {
                userNo: 30,
                username: '胡彦祖',
                role: 'user',
                description: '西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号',
            },
            {
                userNo: 55,
                username: '张三',
                role: 'admin',
                description: '西湖区湖底公园1号',
            },
            {
                userNo: 66,
                username: '张三',
                role: 'user',
                description: '西湖区湖底公园1号',
            },
            {
                userNo: 77,
                username: '张三',
                role: 'admin',
                description: '西湖区湖底公园1号',
            },
            {
                userNo: 88,
                username: '张三',
                role: 'user',
                description: '西湖区湖底公园1号',
            },
        ];
        dataSource.forEach((item, index) => {
            item.key = index + 1 + ''
        })
        setTimeout(() => {
            setTableData(dataSource)
            setTotal(25)
            setLoading(false)
        }, 500);

    }
    // 表格分页、排序、筛选变化时触发
    const onTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('onChange', pagination, filters, sorter, extra);
        setPageInfo({
            current: pagination.current as number,
            pageSize: pagination.pageSize as number,
        })

        const sortParams = {
            field: sorter.field,
            order: sorter.order,
        }
        const params = {
            ...searchForm.getFieldsValue(),
            ...sortParams,
            ...pagination,
        }
        getTableList(params)
    }

    const editClick = (record: any) => {
        console.log('编辑', record);
        toEdit(record)
    }
    const deleteClick = (record: any) => {
        console.log('删除', record);
    }


    // 弹窗modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

     // 查询表单
     const [pageForm] = Form.useForm()
     const pageFormInitialValues = {
         userNo: '',
         username: '',
         role: '',
         startDate: '',
         endDate: '',
     }


    const toAdd = () => {
        showModal()
    }
    const toEdit = (data = {}) => {
        showModal()
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const onRoleChange = (value: string) => {
        switch (value) {
            case 'admin':
                pageForm.setFieldValue('note', 'Hi, 管理员');
                break;
            case 'user':
                pageForm.setFieldsValue({ note: 'Hi, 用户!' });
                break;
            default:
        }
        console.log(pageForm.getFieldsValue());
    }
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
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
            <div style={{ marginBottom: "20px" }}>
                <Button onClick={(e)=>{toAdd()}} color="cyan">新增</Button>
            </div>
            <div className="tableCon">
                <Table
                    dataSource={tableData} columns={tableColumns}
                    loading={loading}
                    pagination={{
                        position: ['bottomRight'],
                        current: pageInfo.current,
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: [10, 30, 100, 1000],
                        total: total,
                        showTotal: (total) => `共 ${total} 条`
                    }}
                    onChange={onTableChange}
                />;
            </div>

            <Modal title="个人信息"  width={600} open={isModalOpen}
             onOk={handleOk} onCancel={handleCancel}>
                <div className="modalContent" style={{ padding: "20px" ,width:'100%'}}>
                <Form
                    form={pageForm}
                    initialValues={pageFormInitialValues}
                    layout={"horizontal"}
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
                            // style={{ width: "120px" }}
                            onChange={onRoleChange}
                            allowClear
                        >
                            <Option value="admin">管理员</Option>
                            <Option value="user">普通用户</Option>
                        </Select>
                    </Form.Item>
                </Form>
                    
                </div>
            </Modal>

        </>
    )
}


