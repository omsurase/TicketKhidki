import React from 'react';
import { Col, Form, Modal, Row, message } from 'antd';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice'
import { AddMovie, UpdateMovie } from '../../apicalls/movies';
import moment from 'moment';

function MoviesForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType,
    getData
}) {
    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format("YYYY-MM-DD");
    }
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading);
            let response = null;
            if (formType === "add") {
                //console.log("hi");
                response = await AddMovie(values);
            } else {
                response = await UpdateMovie({
                    ...values,
                    movieId: selectedMovie._id
                });
            }
            if (response.success) {
                getData();
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
            title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
            open={showMovieFormModal}
            onCancel={() => {
                setShowMovieFormModal(false);
                setSelectedMovie(null);
            }}
            footer={null}
            width={800}
        >

            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={selectedMovie}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Movie Name" name="title">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Movie Description" name="description">
                            <textarea type="text" style={{ width: '100%', resize: 'none' }} />
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
                <div className="flex justify-end gap-1">
                    <Button title="Cancel"
                        type="button"
                        variant="outlined"
                        onclick={() => {
                            setShowMovieFormModal(false);
                            setSelectedMovie(null);
                        }} />
                    <Button title="Save" type="submit" />
                </div>
            </Form>
        </Modal>
    )
}

export default MoviesForm
