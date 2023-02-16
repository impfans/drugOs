import { Column } from '@ant-design/plots'
import React, { useEffect, useState } from 'react'
import { extend } from 'umi-request'

const request = extend({
  prefix: 'http://localhost:7777/',
})
function Sale() {
  const [data, setData] = useState([])
  useEffect(()=>{
    getSale()
  },[])
  const getSale = async () => {
    const res = await request('drug/sale', {
      method: 'post',
    })
    setData(res.data.data)
  }

  const config: any = {
    data,
    xField: 'name',
    yField: 'outTotal',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      name: {
        alias: '药品名称',
      },
      outTotal: {
        alias: '销售数量',
      },
    },
  }
  return (
    <div>
      <h1>药品销售报表</h1>
      <Column {...config} />
    </div>
  )
}

export default Sale
