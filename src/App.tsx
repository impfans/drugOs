import { Button, Layout, theme } from 'antd'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CustomMenu } from '~components'
import { useAuth } from '~hooks'
import Category from './pages/Category'
import Employee from './pages/employee/Employee'
import Index from './pages/Index'
import Inventory from './pages/Inventory'
import Login from './pages/Login'
import Sale from './pages/Sale'
import Stock from './pages/stock'
import Pwd from './pages/user/Pwd'
import UserList from './pages/user/UserList'
const { Header, Content, Sider, Footer } = Layout

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const user: any = window.localStorage.getItem('user')
  console.log(user)
  if (!user) return <Login />
  return (
    <Layout>
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ color: '#fff', fontSize: 24 }}>药店管理系统</div>
          <div style={{ color: '#fff', fontSize: 14 }}>
            <span>当前登录: {JSON.parse(user)?.role === 0 ? '超级管理员' : '管理员'}</span>
            <Button
              style={{ marginLeft: 14 }}
              danger
              type="text"
              onClick={() => {
                window.localStorage.clear()
                window.location.href = '/login'
              }}
            >
              [退出]
            </Button>
          </div>
        </div>
      </Header>
      <Layout>
        <Router>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <CustomMenu />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                height: '100%',
                padding: 24,
                marginTop: 24,
                minHeight: '100vh',
                background: colorBgContainer,
              }}
            >
              <main>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/index" element={<Index />} />
                  <Route path="/staff" element={<Employee />} />
                  <Route path="/supplier" element={<Employee />} />
                  <Route path="/clientele" element={<Employee />} />
                  <Route path="/file" element={<Category />} />
                  <Route path="/storage" element={<Stock />} />
                  <Route path="/out" element={<Stock />} />
                  <Route path="/admin" element={<UserList />} />
                  <Route path="/password" element={<Pwd />} />
                  <Route path="/saleReport" element={<Sale />} />
                  <Route path="/check" element={<Inventory />} />

				  
                </Routes>
              </main>
            </Content>
            <Footer style={{ textAlign: 'center' }}> 药品管理系统 ©2023</Footer>
          </Layout>
        </Router>
      </Layout>
    </Layout>
  )
}

export default App
