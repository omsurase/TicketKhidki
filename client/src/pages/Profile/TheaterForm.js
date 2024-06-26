import React from 'react'
import { Form, Modal, Row, Col } from 'antd';

function TheaterForm({
    showTheaterFormModal,
    setShowTheaterFormModal,
    formType,
    setFormType,
    selectedTheater,
    setSelectedTheater
}) {
    return (
        <div>
            <Modal
                title={formType === "add" ? "Add Theater" : "Edit Theater"}
                open={showTheaterFormModal}
                onCancel={() => {
                    setShowTheaterFormModal(false);
                    setSelectedTheater(null);
                }}
                footer={null}
            >

                <Form
                    layout='vertical'>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input theater name!" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: "Please input theater address!" }]}
                    >
                        <textarea type="text" style={{ width: '100%', resize: 'none' }}/>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Phone Number"
                                name="phone"
                                rules={[{ required: true, message: "Please input theater phone number!" }]}
                            >
                                <input type="text" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: "Please input theater email id!" }]}
                            >
                                <input type="text" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default TheaterForm
