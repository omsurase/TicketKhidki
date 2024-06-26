import React from 'react';
import PageTitle from '../../components/PageTitle';
import { Tabs } from 'antd';
import MoviesList from './MoviesList';
import TheaterList from './TheaterList';
const Admin = () => {
  return (
    <div>
      <PageTitle title="Admin" />
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Movies" key='1'>
          <MoviesList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theaters" key='2'>
          <TheaterList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Admin