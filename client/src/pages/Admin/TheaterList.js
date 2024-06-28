import React, { useState, useEffect } from 'react'
import { GetAllTheaters, UpdateTheater } from '../../apicalls/theaters';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { Table, message } from 'antd';
import { isAction } from 'redux';

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

  const handleStatusChange = async (theater) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateTheater({
        theaterId: theater._id,
        ...theater,
        isActive: !theater.isActive,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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
      title: "Owner",
      dataIndex: "owner",
      render: (text , record) => { return record.owner.name }
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
        return (
          <div className="flex gap-1">
            {record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Block
              </span>
            )}
            {!record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={theaters} />
    </div>
  )
}

export default TheaterList