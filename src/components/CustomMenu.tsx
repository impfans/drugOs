import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
	HomeFilled,
	DatabaseFilled,
	SignalFilled,
	AccountBookFilled,
	SettingFilled,
	RestFilled,
	FolderFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const menus: MenuItem[] = [
	{
		key: "index",
		icon: React.createElement(HomeFilled),
		label: "首页",
	},
	{
		key: "base",
		icon: React.createElement(DatabaseFilled),
		label: "基本档案管理",
		children: [
			{
				key: "staff",
				label: "员工管理",
			},
			{
				key: "supplier",
				label: "供应商管理",
			},
			{
				key: "clientele",
				label: "客户管理",
			},
		],
	},
	{
		key: "stock",
		icon: React.createElement(SignalFilled),
		label: "库存管理",
		children: [
			{
				key: "storage",
				label: "入库管理",
			},
			{
				key: "out",
				label: "出库管理",
			},
			{
				key: "check",
				label: "库存盘点",
			},
		],
	},
	{
		key: "sale",
		icon: React.createElement(AccountBookFilled),
		label: "销售管理",
		children: [
			{
				key: "saleReport",
				label: "销售报表",
			},
		],
	},
	// {
	// 	key: "expired",
	// 	icon: React.createElement(RestFilled),
	// 	label: "过期药品管理",
	// },
	{
		key: "system",
		icon: React.createElement(SettingFilled),
		label: "系统管理",
		children: [
			{
				key: "password",
				label: "修改密码",
			},
			{
				key: "admin",
				label: "管理员账户管理",
			},
		],
	},
	{
		key: "file",
		icon: React.createElement(FolderFilled),
		label: "药品建档资料库",
	},
];

export const CustomMenu: React.FC = () => {

	const navigate = useNavigate()

	const onClick: MenuProps["onClick"] = (e) => {
		navigate(e.key);
	};

	return (
		<Menu
			mode="inline"
			defaultSelectedKeys={["index"]}
			defaultOpenKeys={["base"]}
			style={{ height: "100%", borderRight: 0 }}
			selectedKeys={[
				window.location.pathname.split("/").reverse()[0] === ""
					? "index"
					: window.location.pathname.split("/").reverse()[0],
			]}
			items={menus}
			onClick={onClick}
		/>
	);
};
