import { DeleteOutlined } from '@ant-design/icons'
import { faker } from '@faker-js/faker'
import { Button, Form, Input, InputNumber, message, Modal, Space } from 'antd'
import modal from 'antd/es/modal'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PublicTable } from 'src/components/PublicTable'
import { deleteStock, findStockByStatus, insertStock, updateStock } from 'src/utils/apis'

type Props = {}

const Stock = (props: Props) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState<number>(0)
  const [out, setOut] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState([])
  const [editItem, setEditItem] = useState<any>(false)
  const [form] = Form.useForm()
  const location = useLocation()
  const [name, setName] = useState('')
  const [drugId, setDrugId] = useState('')

  useEffect(() => {
    setDataSource([])
    loadData()
  }, [status])

  const loadData = async () => {
    const res = await findStockByStatus(status, page,name,drugId)
	setName('')
	setDrugId('')
    if (res.code === 200) {
      setDataSource(res.data.data)
    } else {
      message.error(res.msg)
    }
  }

  const inStock = async (value: any) => {
    if (value?.id) {
      const res = await updateStock(value)
      if (res.code === 200) {
        loadData()
        onCancel()
      } else {
        message.error(res.msg)
      }
    } else {
      const res = await insertStock(value)
      if (res.code === 200) {
        loadData()
        onCancel()
      } else {
        message.error(res.msg)
      }
    }
  }

  const outStock = async (value: any) => {
    if (out) value.status = 1
    if (value?.id && !out) {
      const res = await updateStock(value)
      if (res.code === 200) {
        loadData()
        onCancel()
        message.success('更新成功')
      } else {
        message.error(res.msg)
      }
    } else {
      const res = await insertStock(value)
      if (res.code === 200) {
        loadData()
        onCancel()
        message.success('添加成功')
      } else {
        message.error(res.msg)
      }
    }
  }

  const onFinish = (value: any) => {
    value.status = status
    if (out) {
      return outStock(value)
    }
    if (status === 0) {
      inStock(value)
    }
    if (status === 1) {
      outStock(value)
    }
  }

  const onOk = () => {
    form.submit()
  }

  const onCancel = () => {
    setEditItem(false)
    setOut(false)
  }

  const onAdd = () => {
    form?.resetFields()
    setEditItem(true)
    if (status === 0) {
      form?.setFieldValue('drugId', faker.datatype.uuid())
    }
  }

  const onEdit = (item: any) => {
    form.setFieldsValue(item)
    setEditItem(true)
  }
  const onOut = (item: any) => {
    form.setFieldsValue(item)
    setEditItem(true)
    setOut(true)
  }
  const onDelete = (item: any) => {
    modal.confirm({
      title: `是否删除？`,
      icon: <DeleteOutlined />,
      content: `即将删除订单：${item?.id}`,
      okText: '删除',
      cancelText: '取消',
      onOk: async () => {
        const res = await deleteStock(item)
        if (res.code === 200) {
          message.success('删除成功！')
          loadData()
        } else {
          message.error(res.msg)
        }
      },
    })
  }

  useEffect(() => {
	
    switch (location?.pathname) {
      case '/storage':
        setStatus(0)
        break
      case '/out':
        setStatus(1)
        break
    }

  }, [location])

  const columns: any = useMemo(() => {
    const base = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '药品编号',
        dataIndex: 'drugId',
        key: 'drugId',
      },
      {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
      },
      {
        title: '采购数量',
        dataIndex: 'purchaseQuantity',
        key: 'purchaseQuantity',
      },
      {
        title: '采购人',
        dataIndex: 'purchaser',
        key: 'purchaser',
      },
      {
        title: '药品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '类别',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: '入库数量',
        dataIndex: 'inTotal',
        key: 'inTotal',
      },
      {
        title: '出库数量',
        dataIndex: 'outTotal',
        key: 'outTotal',
      },
      {
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
      },
      {
        title: '供应商',
        dataIndex: 'supplier',
        key: 'supplier',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text: any) => new Date(text).toLocaleString(),
      },
      {
        title: '操作',
        key: 'option',
        render: (_: any, record: any) => (
          <Space size="middle">
            <a onClick={() => onEdit(record)}>编辑</a>
            {record.status == 0 ? <a onClick={() => onOut(record)}>出库</a> : ''}
            <a onClick={() => onDelete(record)}>删除</a>
          </Space>
        ),
      },
    ]

    if (status == 0) {
      delete base[7]
      delete base[8]
      delete base[9]
    }

    if (status == 1) {
      delete base[2]
	  delete base[4]
      delete base[3]
      delete base[6]
      delete base[9]
    }

    return base
  }, [status])

  return (
    <div>
      <div style={{ marginBottom: 10, display: 'flex' }}>
        {status == 0 ? (
          <Button type="primary" onClick={onAdd}>
            入库
          </Button>
        ) : (
          ''
        )}
        <div style={{ display: 'flex', marginLeft: 10 }}>
          <Input value={drugId} placeholder="药品编号" style={{ marginLeft: 10 }} onChange = {(e)=>{setDrugId(e.target.value)}}/>

          <Input value = {name} placeholder="药品名称" style={{ marginLeft: 10 }} onChange = {(e)=>{setName(e.target.value)}}/>

          <Button type="primary" onClick={async() => {await loadData()}} style={{ marginLeft: 10 }} >
            搜索
          </Button>
        </div>
      </div>
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        onChange={(e: any) => {
          setPage(e.current)
          setPageSize(e.pageSize)
        }}
        pagination={{ current: page, pageSize, total, showTotal: (total: any) => `总员工 ${total}` }}
      />

      <Modal title="添加 & 编辑" open={Boolean(editItem)} onOk={onOk} onCancel={onCancel}>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={onFinish}>
          <Form.Item label="ID" name="id" hidden>
            <Input disabled />
          </Form.Item>

          <Form.Item label="药品编码" name="drugId" rules={[{ required: true, message: '请输入药品编码！' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="库存" name="stock" rules={[{ required: true, message: '请输入库存！' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          {status === 0 && !out && (
            <Form.Item
              label="采购数量"
              name="purchaseQuantity"
              rules={[{ required: true, message: '请输入采购数量！' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          )}

          {status === 0 && !out && (
            <Form.Item label="采购人" name="purchaser" rules={[{ required: true, message: '请输入采购人！' }]}>
              <Input />
            </Form.Item>
          )}

          <Form.Item label="药品名称" name="name" rules={[{ required: true, message: '请输入药品名称！' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="类别" name="category" rules={[{ required: true, message: '请输入类别！' }]}>
            <Input />
          </Form.Item>

          {(status === 1 || out) && (
            <Form.Item label="出库数量" name="outTotal" rules={[{ required: true, message: '请输入出库数量！' }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          )}
          {status === 0 && !out && (
            <Form.Item label="入库数量" name="inTotal" rules={[{ required: true, message: '请输入入库数量！' }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          )}

          {status === 1 ||
            (out && (
              <Form.Item label="客户名称" name="clientName" rules={[{ required: true, message: '请输入客户名称！' }]}>
                <Input />
              </Form.Item>
            ))}

          {status === 0 && !out && (
            <Form.Item label="供应商" name="supplier" rules={[{ required: true, message: '请输入供应商！' }]}>
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default Stock
