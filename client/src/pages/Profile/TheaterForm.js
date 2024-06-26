import React from 'react'
import { Form, Modal, Row, Col, message } from 'antd';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';

function TheaterForm({
    showTheaterFormModal,
    setShowTheaterFormModal,
    formType,
    setFormType,
    selectedTheater,
    setSelectedTheater
}) {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        try {
            dispatch(ShowLoading);
            let response = null;
            if (formType === "add") { } else { }
            if (response.success) {
                message.success(response.success);
                setShowTheaterFormModal(false);
                setSelectedTheater(null);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading);
        } catch (err) {
            dispatch(HideLoading);
            message.error(err.message);
        }
    }
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
                    layout='vertical'
                    onFinish={onFinish}
                >
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
                        <textarea type="text" style={{ width: '100%', resize: 'none' }} />
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
                    <div className="flex justify-end gap-1">
                        <Button title="Cancel"
                            type="button"
                            variant="outlined"
                            onclick={() => {
                                setShowTheaterFormModal(false);
                                setSelectedTheater(null);
                            }} />
                        <Button title="Save" type="submit" />
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default TheaterForm
