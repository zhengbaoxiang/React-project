/*
 * @Date: 2023-12-20 17:41:05
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-19 18:58:43
 * @descript: 文件描述
 */
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Space } from 'antd';

import { Button, message, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { Table, Tag, Tooltip } from 'antd';

import "./user.css";

import SearchForm from './searchForm';
import PageFormModal from './pageFormModal';

import { useSelector, useDispatch } from 'react-redux';


export default function () {

    const dispatch = useDispatch();
    const users = useSelector((state: { userList: any[] }) => {
        console.log('Updated users state:', state.userList);
        return state.userList;
    });

    console.log('状态刷新就会重新执行 users:', users);

    // 有依赖的useEffect，相当于 Vue watch
    useEffect(() => {
        console.log('渲染触发', '有变化后触发', users);
        lookup()
        return () => { }
    }, [users])
    // 相当于 Vue mounted(){}
    useEffect(() => {
        console.log('只挂载时触发一次');
        lookup()
        return () => { }
    }, [])




    const [searchParams, setSearchParams] = useState<any>({})
    const [tableData, setTableData] = useState<Array<any>>([])
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
    })
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)


    type DataSourceType = {
        userNo: number;
        username: string;
        role: string;
        description?: string;
        key?: string;
    }
    const tableColumns: TableProps<DataSourceType>['columns'] = [
        {
            title: '序号',
            dataIndex: 'key',
            width: 60,
            render: (text, record, index) => {
                return index + 1
            }
        },
        {
            title: '工号',
            dataIndex: 'userNo',
            width: 150,
            sorter: (a, b) => a.userNo - b.userNo,
        },
        {
            title: '姓名',
            dataIndex: 'username',
        },
        {
            title: '角色',
            dataIndex: 'role',
            render: (text, record, index) => {
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
            render: (description) => (
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
                    <Popconfirm
                        title=""
                        description="确定删除吗？"
                        onConfirm={() => deleteClick(record)}
                    >
                        <Button type="text" danger size='small'>删除</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ]

    const searchConfirm = (values: any) => {
        setSearchParams(values)
        lookup()
    }


    const lookup = () => {
        setPageInfo({
            current: 1,
            pageSize: 10,
        })
        // 查询表格数据
        getTableList()
    }
    // 获取表格数据
    const getTableList = (others = {}) => {
        const params = {
            ...searchParams,
            ...pageInfo,
            ...others,
        }
        // 调用api接口
        setTimeout(() => {
            console.log('查询-users', users);
            // 深拷贝
            const usersCopy = users.map((item) => {
                return { ...item }
            })
            const dataSource: DataSourceType[] = usersCopy.length > 0 ? usersCopy : [
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
            ...sortParams,
            ...pagination,
        }
        getTableList(params)
    }
    const deleteClick = (record: any) => {
        console.log('删除', record);
        dispatch({ type: 'DELETE_USER', payload: record });

    }

    // 父组件调用子组件方法
    interface PageFormRef {
        toEdit: (record: any) => void;
        toAdd: () => void;
    }
    // 创建ref
    const pageFormRef = useRef<PageFormRef>(null);
    const editClick = (record: any) => {
        console.log('编辑');
        pageFormRef.current?.toEdit(record)
    }
    const addClick = () => {
        console.log('新增');
        pageFormRef.current?.toAdd()
    }

    // 子组件调用父组件方法
    const modalConfirm = (values: any) => {
        console.log('modalConfirm', values);
        if (values.id) {
            dispatch({ type: 'EDIT_USER', payload: values });
        } else {
            dispatch({ type: 'ADD_USER', payload: values });
        }

        message.success('提交成功')
        getTableList()
    }


    return (
        <>
            <SearchForm from={'function'} onLookup={searchConfirm} />

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

            {/* 绑定ref与事件 */}
            <PageFormModal ref={pageFormRef} onConfirm={modalConfirm} />

        </>
    )
}



