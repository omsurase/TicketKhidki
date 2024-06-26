import React from 'react';
import PageTitle from '../../components/PageTitle';
import { Tabs } from 'antd';
const Admin = () => {
  return (
    <div>
      <PageTitle title="Admin" />
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Movies" key='1'> Movies </Tabs.TabPane>
        <Tabs.TabPane tab="Theaters" key='2'> Theaters </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Admin