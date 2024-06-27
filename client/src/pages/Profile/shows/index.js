import { Modal, Table } from 'antd'
import React, { useState } from 'react'
import Button from '../../../components/Button';

function Shows({ openShowsModal, setOpenShowsModal, theater }) {
    const [view, setView] = useState("table");
    const [shows, setShows] = useState([]);
    const columns = [
        {
            title: "Show Name",
            dataIndex: "name"
        },
        {
            title: "Date",
            dataIndex: "date"
        },
        {
            title: "Time",
            dataIndex: "time"
        },
        {
            title: "Movie",
            dataIndex: "movie"
        },
        {
            title: "Ticket Price",
            dataIndex: "ticketPrice"
        },
        {
            title: "Total Seats",
            dataIndex: "totaleSeats"
        },
        {
            title: "Availaible Seats",
            dataIndex: "available seats"
        },
        {
            title: "Action",
            dataIndex: "action"
        },
    ];
    return (
        <Modal
            title=""
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}
        >
            <h1 className="text-primary text-md uppercase mb-1">
                Theater: {theater.name}
            </h1>
            <hr />

            <div className="flex justify-between mt-1 mb-1 items-center">

                <h1 className='text-md uppercase'>
                    {view === "table" ? "Shows" : "Add Show"}
                </h1>

                <Button
                    variant="outlined"
                    title="Add Show"
                    onClick={() => {
                        setView("form");
                    }}
                />
            </div>

            {view === "table" && <Table columns={columns} dataSource={shows} /> }
        </Modal>
    )
}

export default Shows
