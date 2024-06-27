import { Modal } from 'antd'
import React from 'react'

function Shows({ openShowsModal, setOpenShowsModal, theater })
{
    return (
        <Modal
            title=""
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}
        >
            <h1 className="text-primary-text-xl">
                theater: {theater.name}
            </h1>
        </Modal>
    )
}

export default Shows
