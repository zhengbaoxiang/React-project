import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';


import { Modal } from "antd";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


interface PageFormModalProps {
    onConfirm: (values: any) => void;
}

const PageFormModal = forwardRef((props: PageFormModalProps, ref) => {

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
    const [modalTitle, setModalTitle] = useState('')
    // 查询表单
    const [pageForm] = Form.useForm()
    const pageFormInitialValues = {
        id: null, // Ensure id is part of the initial values
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
        setModalTitle('新增个人信息')
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
        setModalTitle('编辑个人信息')
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
                props.onConfirm(values)
            }, 200);
        }).catch((errorInfo) => {
            console.log('Failed:', errorInfo);
            setConfirmLoading(false);
        });
    };

    const handleCancel = () => {
        pageForm.resetFields();
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal title={modalTitle} width={600} open={isModalOpen}
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
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name="userNo" label="账号" rules={[{ required: true }]}>
                            <Input disabled={pageForm.getFieldValue('id')} />
                        </Form.Item>
                        <Form.Item name="username" label="姓名" rules={[{ required: true }]}>
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
                            <DatePicker onChange={onDateChange} style={{ width: "100%" }} />
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
export default PageFormModal