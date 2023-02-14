import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Modal, Row, Input, Upload, UploadProps, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { extend } from 'umi-request'

const request = extend({
  prefix: 'http://localhost:7777/',
})
const { Meta } = Card

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  useEffect(() => {
    getCategory()
  }, [])
  const getCategory = async () => {
    const res = await request('category/findAll', {
      method: 'POST',
      data: {
        page: 1,
        pageSize: 100,
      },
    })
    console.log(res)
    setData(res.data.data)
  }
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = async (values: any) => {
    const res = await request('category/insertCategory', {
      method: 'POST',
      data: { name: values.name, img: 'http://127.0.0.1:7777/img/' + values.img.fileList[0].response?.name || '' },
    })
    if (res.code === 200) {
      message.success('新增成功')
    } else {
      message.error('新增失败')
    }
    await getCategory()
    setIsModalOpen(false)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const props: UploadProps = {
    name: 'file',
    maxCount: 1,
    showUploadList: false,
    action: 'http://127.0.0.1:7777/category/upload',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Button type="primary" onClick={showModal}>
          添加
        </Button>
      </div>
      <Row gutter={[24, 24]}>
        {data.map((item: any, key) => {
          return (
            <Col key={key}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img style={{ height: 200 }} alt="example" src={item.img} />}
                actions={[
                  <DeleteOutlined
                    key="delete"
                    onClick={async () => {
                      await request('category/deleteCategory', { method: 'POST', data: { id: item.id } })
                      message.success('删除成功')
                      await getCategory()
                    }}
                  />,
                ]}
              >
                <Meta title={item.name} />
              </Card>
            </Col>
          )
        })}
      </Row>
      <Modal
        title="添加药品信息"
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
          <Form.Item label="药品名称" name="name" rules={[{ required: true, message: '请填写药品名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="药品图片" name="img" rules={[{ required: true, message: '请上传药品图片!' }]}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>上传药品图片</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="添加药品信息"
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
          <Form.Item label="药品名称" name="name" rules={[{ required: true, message: '请填写药品名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="药品图片" name="img" rules={[{ required: true, message: '请上传药品图片!' }]}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>上传药品图片</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Category
