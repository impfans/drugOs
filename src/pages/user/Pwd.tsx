import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { extend } from 'umi-request'

const request = extend({
  prefix: 'http://localhost:7777/',
})

function Pwd() {
  const onFinish = async (values: any) => {
    console.log('values:', values)

    if(values.newPassword !== values.password){
        return message.error('密码不一致')
    }
    await request('employee/pwd', {
      method: 'POST',
      data: {id: 23,password: values.password},
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="" name="id"></Form.Item>
        <Form.Item label="原密码" name="oldPassword" rules={[{ required: true, message: '请填写姓名!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="新密码" name="newPassword" rules={[{ required: true, message: '请填写性别!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="确认密码" name="password" rules={[{ required: true, message: '请填写手机号!' }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Pwd
