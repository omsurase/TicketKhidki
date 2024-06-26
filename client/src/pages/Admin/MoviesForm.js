import React from 'react';
import { Col, Form, Modal, Row, message } from 'antd';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import {HideLoading, ShowLoading} from '../../redux/loaderSlice'
import { AddMovie } from '../../apicalls/movies';

function MoviesForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType
}) {
    const dispatch = useDispatch();
    const onFinish = async(values) => {
        try { 
            dispatch(ShowLoading);
            let response = null;
            if (formType === "add") {
                response = await AddMovie(values);
            } else { 

            }
            if (response.success) {
                message.success(response.message);
                setShowMovieFormModal(false);
            }
            else { 
                console.log(response.message);
                message.error(response.message);
            }
            dispatch(HideLoading);
        } catch (err) { 
            dispatch(HideLoading());
            message.error(err.message);
        }
     };
    return (
        <Modal
            title={formType == "add" ? "Add Movie" : "Edit Movie"}
            open={showMovieFormModal}
            onCancel={() => setShowMovieFormModal(false)}
            footer={null}
            width={800}
        >

            <Form
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Movie Name" name="title">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Movie Description" name="description">
                            <textarea type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Movie Duration" name="duration">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Language" name="language">
                            <select name='' id=''>
                                <option value="">Select Language</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Marathi">Marathi</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Telgu">Telgu</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Movie Release date" name="releaseDate">
                            <input type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Genre" name="genre">
                            <select name='' id=''>
                                <option value="">Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Romance">Romance</option>
                                <option value="Drama">Drama</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Poster URL" name="poster">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="flex justify-end">
                    <Button title="Cancel" type="button" variant="outlined" onclick={() => setShowMovieFormModal(false)} />
                    <Button title="Save" type="submit"/>
                </div>
            </Form>
        </Modal>
    )
}

export default MoviesForm
