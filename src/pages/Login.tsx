import { Button, Col, Form, Input, message, Row } from 'antd'
import React from 'react'
import { extend } from 'umi-request'

const request = extend({
  prefix: 'http://localhost:7777/',
})
import '../index.css'
const Login = () => {
  const onFinish = async (values: any) => {
    console.log('values:', values)
    const res = await request('employee/login', {
      method: 'post',
      data: values,
    })
    console.log('res:', res)
    if (res.code === 200) {
      window.localStorage.setItem('user', JSON.stringify(res.data))

      return (window.location.href = '/')
    }
    message.error('用户名或密码错误')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Row>
        <Col span={12}></Col>
        <Col span={10}>
          <div className="denglukuang">
            <h1 style={{ padding: 14, textAlign: 'center' }}>药店管理系统登录</h1>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ width: 500 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="" name="id"></Form.Item>
              <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请填写姓名!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="密码" name="password" rules={[{ required: true, message: '请填写密码!' }]}>
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" size="large" style={{ width: 300 }}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  )
}

export default Login
