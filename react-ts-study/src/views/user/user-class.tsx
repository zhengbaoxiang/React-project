import React from 'react'
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Space } from 'antd';

import { Button, message, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { Table, Tag, Tooltip } from 'antd';

import "./user.css";
import SearchForm from './searchForm';
import PageFormModal from './pageFormModal';


export default function () {
    return (
        <>
            <MyUser from={{ type: 1, name: '外部props' }} />
        </>
    );
}

interface MyUserProps {
    from: {
        type: number;
        name: string;
    };
}
type DataSourceType = {
    userNo: number;
    username: string;
    role: string;
    description?: string;
    key?: string;
}
interface MyUserState {
    clickCount: number;
    timer: any;
    date: Date;
    list: number[];
    searchParams: object;
    pageInfo: {
        current: number;
        pageSize: number;
        total: number;
    };
    tableColumns: TableProps<DataSourceType>['columns'];
    tableData: any[];
    tableLoading: boolean;
}

class MyUser extends React.Component<MyUserProps, MyUserState> {
    pageFormRef: any;
    // class创建的组件，有自己的私有数据和生命周期函数    
    constructor(props: any) {
        super(props)    // 调用super之后，才能使用this.
        // class创建的组件中，使用外部传入的参数，无需接受，直接访问
        console.log('props:', this.props)
        // 相当于vue组件中的 data (){ return {} } 可读可写
        this.state = {
            clickCount: 0,
            timer: null,
            date: new Date(),
            list: [1, 2, 3, 4, 5],
            searchParams: {},
            pageInfo: {
                current: 1,
                pageSize: 10,
                total: 0
            },
            tableColumns: [
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
                    render: (_: any, record: any) => (
                        <Space size="small">
                            <Button onClick={(e) => { e.stopPropagation(), this.editClick(record) }} type="text" size='small'>编辑</Button>
                            <Popconfirm
                                title=""
                                description="确定删除吗？"
                                onConfirm={() => this.deleteClick(record)}
                            >
                                <Button type="text" danger size='small'>删除</Button>
                            </Popconfirm>

                        </Space>
                    ),
                },
            ],
            tableData: [],
            tableLoading: false,
        }
        this.pageFormRef = React.createRef();
    }
    componentDidMount() {
        console.log('componentDidMount');
        this.tick()
        this.lookup()
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this.state.timer)
    }
    // practice
    tick() {
        const timer = setInterval(() => {
            // 直接修改state的值，不会触发重新渲染
            // setState是异步的，多次调用会合并
            this.setState({
                clickCount: this.state.clickCount + 1
            })
            this.setState({
                clickCount: this.state.clickCount + 1
            })
            // 通过函数的方式修改state，会触发重新渲染,因此总共会加 3
            this.setState((state) => {
                return { clickCount: state.clickCount + 1 };
            });
            this.setState((state) => {
                return { clickCount: state.clickCount + 1 };
            });
            this.setState({
                date: new Date()
            })
            // console.log('1s 执行一次', this.state.date)
        }, 1 * 1000)
        this.setState({ timer })
    }
    // 定义箭头函数指定 上下文 this 
    // 如果定义时不用箭头函数， 则使用是也得用 onClick={(e) => this.lookup()}，否则this指向的是当前元素
    lookup = () => {
        this.setState({
            pageInfo: {
                current: 1,
                pageSize: 10,
                total: 0
            }
        }, () => {
            this.getTableList()
        })
    }
    searchConfirm = (values: any) => {
        this.setState({
            searchParams: values
        }, () => {
            this.lookup()
        })
    }
    getTableList(others = {}) {
        const { searchParams, pageInfo } = this.state
        const params = {
            ...searchParams,
            ...pageInfo,
            ...others,
        }
        // 调用api接口
        setTimeout(() => {
            console.log('查询-users', params);
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
            this.setState({
                tableData: dataSource,
                pageInfo: {
                    ...this.state.pageInfo,
                    total: 25
                },
                tableLoading: false
            })
        }, 500)
    }

    deleteClick = (record: DataSourceType) => {
        console.log('删除', record);
    }
    editClick = (record: DataSourceType) => {
        console.log('编辑');
        this.pageFormRef?.current?.toEdit(record)

    }
    addClick = () => {
        console.log('新增');
        this.pageFormRef?.current?.toAdd()
    }
    modalConfirm = (values: any) => {
        message.success('提交成功')
        this.getTableList()
    }

    // 渲染函数必须
    render() {
        const { from } = this.props
        const { clickCount, date, } = this.state
        const { tableColumns, tableData, tableLoading, pageInfo } = this.state

        return <div>
            <SearchForm onLookup={this.searchConfirm} />

            <div style={{ marginBottom: "20px" }}>
                <Button onClick={this.addClick} color="cyan">新增</Button>
                <p style={{display:'inline-block',marginLeft:'30px'}}>{clickCount}_{from.name}_{date.toLocaleTimeString()} </p>
            </div>
            <div className="tableCon">
                <Table
                    dataSource={tableData} columns={tableColumns}
                    loading={tableLoading}
                    pagination={{
                        position: ['bottomRight'],
                        current: pageInfo.current,
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: [10, 30, 100, 1000],
                        total: pageInfo.total,
                        showTotal: (total) => `共 ${total} 条`
                    }}
                />;
            </div>

            {/* 绑定ref与事件 */}
            <PageFormModal ref={this.pageFormRef} onConfirm={this.modalConfirm} />

        </div>
    }
}


