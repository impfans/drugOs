import { Form, Input, Modal, Space,message } from 'antd'
import React, { useEffect, useState } from 'react'
import { PublicTable } from 'src/components/PublicTable'
import { extend } from 'umi-request'

const request = extend({
  prefix: 'http://localhost:7777/',
})

function UserList() {
  const [dataSource, setDateSource] = useState([])
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<any>(false);
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '级别',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: any) => {
        return <div>{record.status === 0 ? '超级管理员' : '管理员'}</div>
      },
    },
    {
      title: '操作',
      key: 'option',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
                setEditItem(record)
              form.setFieldsValue(record)
              setIsModalOpen(true)
            }}
          >
            编辑
          </a>
          <a
            onClick={async () => {
              await request('employee/deleteEmployee', {
                method: 'POST',
                data: { id: record.id },
              })
              await getAdmin()
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ]
  useEffect(() => {
    getAdmin()
  }, [])
  const getAdmin = async () => {
    const res = await request('employee/findAdmin', {
      method: 'POST',
    })
    setDateSource(res.data.data)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditItem(false)
  }
  const onFinish = async (values: any) => {
    const obj = Object.assign({},editItem,values)
    const res = await request('employee/updateEmployee', {
      method: 'POST',
      data: obj,
    })
    if(res.code === 200){
        message.success('更新成功 ');
        await getAdmin()
    }else{
        message.error('更新失败');
    }

    console.log(obj)
    setIsModalOpen(false)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      <PublicTable dataSource={dataSource} columns={columns} />
      <Modal
        title="编辑管理员信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="添加"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        <Form.Item label="" name="id" >
          </Form.Item>
          <Form.Item label="姓名" name="username" rules={[{ required: true, message: '请填写姓名!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="sex" rules={[{ required: true, message: '请填写性别!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '请填写手机号!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="地址" name="address" rules={[{ required: true, message: '请填写地址!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserList
