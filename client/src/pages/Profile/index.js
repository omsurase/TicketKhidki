import React from 'react';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import pageTitle from '../../components/PageTitle';
import TheaterList from './TheaterList';


function Profile() {
  return (
    <div>
      <pageTitle title=" Profile " />
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Bookings" key="1">
          Bookings
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key="2">
          <TheaterList/>
        </Tabs.TabPane>

      </Tabs>
    </div>
  )
}

export default Profile
