import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Modal, Row,Input,Upload, UploadProps,message } from 'antd'
import React, { useState } from 'react'
const { Meta } = Card;

const Category = ()=> {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState<string>();
    const [img, setImg] = useState<string>();
	const [form] = Form.useForm();
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
        form.submit();
    //   setIsModalOpen(false);
      console.log(name,img)
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

      const props: UploadProps = {
        name: 'file',
        maxCount:1,
        showUploadList:false,
        action: 'http://127.0.0.1:7777/category/upload',
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            console.log('done-----<',info)
            setImg('http://127.0.0.1:7777/img/' + info.fileList[0].response?.name || '')
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
  return (
    <div>
        <div style = {{marginBottom: 24}}>
            <Button type="primary" onClick={showModal}>添加</Button>
        </div>
        <Row gutter={[24,24]}>
            <Col >
                 <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img style={{height:200}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
            
                    <Meta title="Europe Street beat" />
   
                </Card>
              </Col>
              <Col >
                 <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img style={{height:200}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat"  />
                </Card>
              </Col>
              <Col >
                 <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img style={{height:200}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat"  />
                </Card>
              </Col>
              <Col >
                 <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img style={{height:200}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat"  />
                </Card>
              </Col>
              <Col >
                 <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img style={{height:200}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat"  />
                </Card>
              </Col>
              <Col >
                 <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img style={{height:200}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat"  />
                </Card>
              </Col>
        </Row>
        <Modal title = '添加药品信息' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText = '取消' okText = '添加' >
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
    <Form.Item
      label="药品名称"
      name="name"
      rules={[{ required: true, message: '请填写药品名称!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item label="药品图片"
      name="img"
      rules={[{ required: true, message: '请上传药品图片!' }]}>
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
