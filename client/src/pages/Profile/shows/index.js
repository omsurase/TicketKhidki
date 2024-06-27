import { Col, Form, Modal, Row, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { GetAllMovie } from '../../../apicalls/movies';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';


function Shows({ openShowsModal, setOpenShowsModal, theater }) {
    const [view, setView] = useState("table");
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const dispatch = useDispatch();
    const getMovies = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllMovie();
            if (response.success) {
                //console.log(response.data)
                setMovies(response.data);
                //console.log(movies);
            }
            else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    }

    useEffect(() => {
        //console.log(movies);
        getMovies();
        //console.log(movies);
    }, []);

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

                {view === "table" && (
                    <Button
                        variant="outlined"
                        title="Add Show"
                        onclick={() => {
                            //console.log("hi");
                            setView("form");
                        }}
                    />
                )}
            </div>

            {view === "table" && (<Table columns={columns} dataSource={shows} />)}

            {view === "form" && (<Form>
                <Row
                    gutter={[16, 16]}
                >
                    <Col span={8}>
                        <Form.Item label="Show Name" name="name" rules={[{ required: true, message: "Please input show name!" }]}>
                            <input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please input show date!" }]}>
                            <input type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Time" name="time" rules={[{ required: true, message: "Please input show time!" }]}>
                            <input type="time" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Movie" name="movie" rules={[{ required: true, message: "Please input select movie!" }]}>
                            <select>
                                <option value="">Select Movie</option>
                                {movies.map((movie) => (
                                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                                ))}
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Ticket Price" name="ticketPrice" rules={[{ required: true, message: "Please input show price!" }]}>
                            <input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Total Seats" name="totalSeats" rules={[{ required: true, message: "Please input total number of seats!" }]}>
                            <input type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="flex justify-end gap-1">
                    <Button
                        variant="outlined"
                        title="Cancel"
                        onclick={() => {
                            setView("table");
                        }}
                    />
                    <Button
                        variant="contained"
                        title="SAVE"
                        type="submit"
                    />
                </div>
            </Form>)}
        </Modal>
    )
}

export default Shows
