import { Table } from 'antd'
import React from 'react'

export const PublicTable: React.FC<{ dataSource: any[]; columns: any[],pagination?: any, onChange?: any}> = ({ dataSource, columns, pagination,onChange}) => {
  return <Table dataSource={dataSource} columns={columns} pagination = {pagination} onChange = {onChange} />
}
