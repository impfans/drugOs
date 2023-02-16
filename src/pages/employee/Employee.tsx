import { Button, Form, FormInstance, Input, InputNumber, InputRef, message, Modal, Select, Space } from 'antd'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PublicTable } from 'src/components/PublicTable'
import { faker } from '@faker-js/faker'
import { useLocation } from 'react-router-dom'
import { DeleteColumnOutlined, DeleteOutlined } from '@ant-design/icons'
import { deleteEmployee, findEmployeeByStatus, insertEmployee, updateEmployee } from 'src/utils/apis'
import { keysIn } from 'lodash-es'
import moment from 'moment'

// const dataSource = [...Array(30)].map((i, k) => {
// 	return {
// 		id: faker.datatype.uuid(),
// 		key: faker.datatype.uuid(),
// 		username: faker.internet.userName(),
// 		sex: faker.random.numeric(),
// 		phone: faker.phone.number(),
// 		createdTime: faker.datatype.datetime(),
// 		age: faker.random.numeric(2),
// 		address: faker.address.cityName(),
// 	}
// })

const Employee = () => {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [total, setTotal] = useState(0);
	const [status, setStatus] = useState<number>(1);
	const [dataSource, setDataSource] = useState([]);
	const [editItem, setEditItem] = useState<any>(false);
	const [modal, contextHolder] = Modal.useModal();
	const [form] = Form.useForm();
	const jobNumberInput = useRef<HTMLInputElement>(null);
	const usernameInput = useRef<InputRef>(null);

	const location = useLocation();

	useEffect(() => {
		switch (location?.pathname) {
			case '/staff':
				loadData(1);
				setStatus(1);
				break;
			case '/supplier':
				loadData(2);
				setStatus(2)
				break;
			case '/clientele':
				loadData(3);
				setStatus(3)
				break;
		}
	}, [location]);

	const columns = useMemo(() => {
		const base = [
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
				title: '工号',
				dataIndex: 'jobNumber',
				key: 'jobNumber',
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
			},
			{
				title: '负责人',
				dataIndex: 'supplier',
				key: 'supplier',
			},
			{
				title: '联系方式',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '住址',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '添加时间',
				dataIndex: 'createdTime',
				key: 'createdTime',
				render: (_: any, record: any) => <div>{moment(record.createdTime).format('YYYY-MM-DD')}</div>
			},
			{
				title: '备注',
				dataIndex: 'description',
				key: 'description',
			},
			{
				title: '操作',
				key: 'option',
				render: (_: any, record: any) => (
					<Space size="middle">
						<a onClick={() => onEdit(record)}>编辑</a>
						<a onClick={() => onDelete(record)}>删除</a>
					</Space>
				),
			},
		]

		if (status === 1) {
			delete base[3]
			delete base[4]
		}

		if (status === 2) {
			delete base[3]
			delete base[2]

		}

		if (status === 3) {
			delete base[4]
			delete base[2]

		}

		return base
	}, [status]);

	const loadData = async (status: number) => {
		const res = await findEmployeeByStatus(status, page, parseInt(jobNumberInput.current!.value.toString(), 10), usernameInput.current?.input?.value);
		if (res.code === 200) {
			setDataSource(res.data.data);
			setTotal(res.data.count)
		} else {
			message.error(res.msg);
		}
	}

	const onFinish = async (value: any) => {
		value.status = status;
		if (value?.id) {
			const res = await updateEmployee(value);
			if (res.code === 200) {
				setEditItem(false);
				loadData(status);
			} else {
				message.error(res.msg);
			}
		} else {
			const res = await insertEmployee(value);
			if (res.code === 200) {
				setEditItem(false);
				loadData(status);
			} else {
				message.error(res.msg);
			}
		}
	}

	const onOk = () => {
		form.submit();
	}

	const onCancel = () => {
		setEditItem(undefined)
	}

	const onAdd = () => {
		form?.resetFields()
		setEditItem({
			id: undefined
		})
	}

	const onEdit = (item: any) => {
		setEditItem(item);
		form.setFieldsValue(item)
	}

	const onDelete = useCallback((item: any) => {
		modal.confirm({
			title: `是否删除？`,
			icon: <DeleteOutlined />,
			content: `即将删除用户：${item?.username}`,
			okText: '删除',
			cancelText: '取消',
			onOk: async () => {
				const res = await deleteEmployee(item);
				if (res.code === 200) {
					message.success("删除成功！");
					loadData(status);
				} else {
					message.error(res.msg);
				}
			}
		});
	}, [status])

	return (
		<div>
			<div style={{ marginBottom: 10, display: "grid", gridTemplateColumns: "150px 150px 64px 64px", gap: 10 }}>
				{
					status === 1 &&
					<>
						<InputNumber ref={jobNumberInput} placeholder='工号' style={{ width: "100%" }} />
						<Input ref={usernameInput} placeholder='用户名' width={120} />
						<Button type='primary' onClick={() => loadData(status)}>搜索</Button>
					</>
				}
				<Button type='primary' onClick={onAdd}>添加</Button>
			</div>

			<PublicTable
				dataSource={dataSource}
				columns={columns}
				onChange={(e: any) => {
					setPage(e.current)
					setPageSize(e.pageSize)
					loadData(status)
				}}
				pagination={{ current: page, pageSize, total, showTotal: (total: any) => `总员工 ${total}` }}
			/>

			<Modal
				title="新增 & 编辑"
				open={Boolean(editItem)}
				okText="确认"
				cancelText="取消"
				onOk={onOk}
				onCancel={onCancel}
			>

				<Form
					form={form}
					onFinish={onFinish}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
				>
					<Form.Item
						label="ID"
						name="id"
						hidden
					>
						<Input disabled={true} />
					</Form.Item>
					{status === 2 &&
						<Form.Item
							label="供应商"
							name="supplier"
							rules={[{ required: true, message: '请输入供应商！' }]}
						>
							<Input />
						</Form.Item>
					}
					{status === 2 &&
						<Form.Item
							label="负责人"
							name="principal"
							rules={[{ required: true, message: '请输入负责人！' }]}
						>
							<Input />
						</Form.Item>
					}
					{status === 1 &&
						<Form.Item
							label="工号"
							name="jobNumber"
							rules={[{ required: true, message: '请输入工号！' }]}
						>
							<InputNumber style={{ width: "100%" }} />
						</Form.Item>
					}
					{status === 1 &&
						<Form.Item
							label="密码"
							name="password"
							rules={[{ required: true, message: '请选输入密码！' }]}
						>
							<Input />
						</Form.Item>
					}
					<Form.Item
						label="姓名"
						name="username"
						rules={[{ required: true, message: '请输入姓名！' }]}
					>
						<Input />
					</Form.Item>
					{status === 1 || status === 3 &&
						<Form.Item
							label="性别"
							name="sex"
							rules={[{ required: true, message: '请选择用户性别！' }]}
						>
							<Select
								options={[
									{ value: '男' },
									{ value: '女' },
								]}
							/>
						</Form.Item>
					}

					<Form.Item
						label="电话"
						name="phone"
						rules={[{ required: true, message: '请输入联系方式！' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="地址"
						name="address"
						rules={[{ required: true, message: '请输入联系地址！' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="备注"
						name="description"
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
			{contextHolder}
		</div>
	)
}

export default Employee


/*
	private String username;
	private Integer id;
	private String password;
	private String sex;
	 * 电话
	private String phone;
	 * 地址
	private String address;
	private Date createdTime;
	 * 工号
	private Integer jobNumber;
	 * 0：管理员 1：员工 2：供应商 3: 客户
	private Integer status;
	 * 供应商
	private String supplier;
	 * 负责人
	private String principal;
	private String description;
*/
