import React,{useEffect,useState} from 'react'
import Pendings from './pendings/Pendings'
import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import style from './pendings/pendings.module.css'
function App() {
  const {Sider,Header,Content} = Layout
  const [collapsed,setCollapsed] = useState(false)
  useEffect(()=>{

  },[])
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className={style.header}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Edgar Núñez Trejo',
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header className={style.header}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content>
          <Pendings/>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
