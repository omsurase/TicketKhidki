import React, { useState, useEffect } from 'react'
import { GetAllTheaters } from '../../apicalls/theaters';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { Table, message } from 'antd';

function TheaterList() {
  const dispatch = useDispatch();
  const [theaters, setTheaters] = useState([]);
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheaters();
      if (response.success) {
        setTheaters(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Address",
      dataIndex: "address"
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Approved"
        }
        else {
          return "Pending/Blocked"
        }
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        <div className="flex gap-1"></div>
      }
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={theaters} />
    </div>
  )
}

export default TheaterList