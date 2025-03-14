/*
 * @Date: 2023-12-20 17:41:05
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-14 19:06:32
 * @descript: 文件描述
 */
import "./user.css";
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Space } from 'antd';


import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

import type { TableProps } from 'antd';
import { Table, Tag, Tooltip } from 'antd';

import { Modal } from "antd";
import { use } from "echarts";


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
                    <Button onClick={(e) => { e.stopPropagation(), editClick(record) }} type="text" size='small'>编辑</Button>
                    <Button onClick={(e) => { e.stopPropagation(), deleteClick(record) }} type="text" danger size='small'>删除</Button>
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


    interface PageFormRef {
        toEdit: (record: any) => void;
        toAdd: () => void;
    }

    const pageFormRef = useRef<PageFormRef>(null);

    const editClick = (record: any) => {
        console.log('编辑');
        pageFormRef?.current?.toEdit(record)
    }
    const deleteClick = (record: any) => {
        console.log('删除', record);
    }
    const addClick = () => {
        console.log('新增');
        pageFormRef?.current?.toAdd()
    }

    const modalConfirm = () => {
        console.log('modalConfirm');
        getTableList()
    }





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
                <Button onClick={addClick} color="cyan">新增</Button>
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

            <PageFormModal ref={pageFormRef} onConfirm={modalConfirm} />


        </>
    )
}

interface PageFormModalProps {
    onConfirm: () => void;
}

export const PageFormModal = forwardRef((props: PageFormModalProps, ref) => {

    // 使用此方法才能暴露出去内部方法,通过ref传给pageFormRef
    useImperativeHandle(ref, () => {
        return {
            toAdd: () => toAdd(),
            toEdit: (data: any) => toEdit(data),
            selfPorps: () => console.log('selfPorps')
        }
    });

    // 弹窗modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    // 查询表单
    const [pageForm] = Form.useForm()
    const pageFormInitialValues = {
        userNo: '',
        username: '',
        role: '',
        description: '',
    }

    const toAdd = () => {
        pageForm.setFieldsValue({
            id: null,
            userNo: '',
            username: '',
            role: '',
            description: '',
        })
        showModal()
    }
    const toEdit = (data: any = {}) => {
        pageForm.setFieldsValue({
            id: data.userNo,
            userNo: data.userNo,
            username: data.username,
            role: data.role,
            description: data.description,

        })
        showModal()
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const onRoleChange = (value: string) => {
        switch (value) {
            case 'admin':
                pageForm.setFieldValue('description', 'Hi, 管理员');
                break;
            case 'user':
                pageForm.setFieldsValue({ description: 'Hi, 用户!' });
                break;
            default:
        }
        console.log(pageForm.getFieldsValue());
    }

    const onDateChange = (date: any, dateString: string | string[]) => {
        console.log(date, dateString);
    }
    const onDateRangeChange = (dates: any, dateStrings: [string, string]) => {
        console.log(dates, dateStrings);
    }


    const handleOk = () => {
        setConfirmLoading(true);
        pageForm.validateFields().then((values) => {
            console.log('Received values of form: ', values);
            setTimeout(() => {
                setIsModalOpen(false);
                setConfirmLoading(false);

                props.onConfirm()

            }, 1000);
        }).catch((errorInfo) => {
            console.log('Failed:', errorInfo);
            setConfirmLoading(false);
        });
    };

    const handleCancel = () => {
        pageForm.resetFields();
        setIsModalOpen(false);
        props.onConfirm()
    };

    return (
        <>
            <Modal title={`${pageForm.getFieldValue('id') ? '编辑' : '新增'} 个人信息`} width={600} open={isModalOpen}
                onOk={handleOk} onCancel={handleCancel}
                confirmLoading={confirmLoading}
            >
                <div className="modalContent" style={{ padding: "20px", width: '100%' }}>
                    <Form
                        form={pageForm} // Ensure the form prop is passed here
                        initialValues={pageFormInitialValues}
                        layout={"horizontal"}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Form.Item name="username" label="姓名" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="userNo" label="账号" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="role" label="角色" rules={[{ required: true }]}>
                            <Select
                                // style={{ width: "120px" }}
                                onChange={onRoleChange}
                                allowClear
                            >
                                <Option value="admin">管理员</Option>
                                <Option value="user">普通用户</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="date" label="日期">
                            <DatePicker onChange={onDateChange}  style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="dateRange" label="时间范围">
                            <RangePicker onChange={onDateRangeChange} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="description" label="描述" rules={[{ required: false }]}>
                            <TextArea rows={4} />
                        </Form.Item>

                    </Form>

                </div>
            </Modal>
        </>
    )

})


