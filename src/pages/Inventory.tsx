import React, { useEffect, useState } from 'react'
import { PublicTable } from 'src/components/PublicTable'
import { extend } from 'umi-request'

const request = extend({
  prefix: 'http://localhost:7777/',
})
function Inventory() {
  const [data, setData] = useState([])

  useEffect(() => {
    getin()
  }, [])
  const getin = async () => {
    const res = await request('drug/inventory', {
      method: 'post',
      data:{
        page:1,
        pageSize: 100
      }
    })
    const arr:any = [];
    const maps = res.data?.data.map((item: any,key: any)=>{
        if(arr.length === 0){
            arr.push(item)
        }
        let test = []
        for(let i = 0 ; i < arr.length ; i++){
            test.push(arr[i].name)
        }
        if(test.indexOf(item.name) < 0){
            arr.push(item)
        }
    })
    setData(arr)
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '药品名称',
      dataIndex: 'name',
      key: 'name',
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
      title: '类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => new Date(text).toLocaleString(),
    },
  ]
  return (
    <div>
      <PublicTable dataSource={data} columns={columns} />
    </div>
  )
}

export default Inventory
