import React, { useState, useEffect } from 'react'
import Button from '../../components/Button';
import TheaterForm from './TheaterForm';
import { DeleteTheater, GetAllTheatersByOwner } from '../../apicalls/theaters';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { Table, message } from 'antd';

function TheaterList() {
    const dispatch = useDispatch();
    const [showTheaterFormModal, setShowTheaterFormModal] = useState(false);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [formType, setFormType] = useState("add");
    const [theaters, setTheaters] = useState([]);
    const { user } = useSelector(state => state.users);
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatersByOwner({ owner: user._id });
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

    const handleDelete = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteTheater({ theaterId: id });
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
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
                return <div className="flex gap-1">
                    <i className="ri-pencil-line"
                        onClick={() => {
                            setSelectedTheater(record);
                            setFormType("edit");
                            setShowTheaterFormModal(true);
                        }}></i>
                    <i
                        className="ri-delete-bin-2-line "
                        onClick={() => { handleDelete(record._id); }}
                    ></i>
                </div>
            }
        },
    ];

    return (
        <div>
            <div className="flex justify-end mb-1">
                <Button title="Add Theater" variant='outlined'
                    onclick={() => {
                        setFormType("add");
                        setShowTheaterFormModal(true);
                    }} />
            </div>

            <Table columns={columns} dataSource={theaters} />

            {showTheaterFormModal && <TheaterForm
                showTheaterFormModal={showTheaterFormModal}
                setShowTheaterFormModal={setShowTheaterFormModal}
                formType={formType}
                setFormType={setFormType}
                selectedTheater={selectedTheater}
                setSelectedTheater={setSelectedTheater}
                getData={getData}
            />}
        </div>
    )
}

export default TheaterList