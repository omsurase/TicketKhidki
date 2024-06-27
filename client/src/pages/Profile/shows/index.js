import { Col, Form, Modal, Row, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { GetAllMovie } from '../../../apicalls/movies';
import { AddShow, GetAllShowsByTheater } from '../../../apicalls/theaters';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import moment from "moment";

function Shows({ openShowsModal, setOpenShowsModal, theater }) {
    const [view, setView] = useState("table");
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const dispatch = useDispatch();


    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const movieResponse = await GetAllMovie();
            if (movieResponse.success) {
                //console.log(response.data)
                setMovies(movieResponse.data);
                //console.log(movies);
            }
            else {
                message.error(movieResponse.message);
            }

            const showResponse = await GetAllShowsByTheater({
                theaterId: theater._id
            });
            if (showResponse.success) {
                //console.log(response.data)
                setShows(showResponse.data);
                //console.log(movies);
            }
            else {
                message.error(showResponse.message);
            }


            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    }

    const handleAddShow = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await AddShow({
                ...values,
                theater: theater._id
            });
            if (response.success) {
                message.success(response.message);
                getData();
                setView("table");
            }
            else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            message.error(err.message);
            dispatch(HideLoading());
        }
    }

    useEffect(() => {
        //console.log(movies);
        getData();
        //console.log(movies);
    }, []);

    const columns = [
        {
            title: "Show Name",
            dataIndex: "name"
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => {
                return moment(text).format("MMM DD YYYY");
            }
        },
        {
            title: "Time",
            dataIndex: "time"
        },
        {
            title: "Movie",
            dataIndex: "movie",
            render: (text, record) => {
                return record.movie.title;
            }
        },
        {
            title: "Ticket Price",
            dataIndex: "ticketPrice"
        },
        {
            title: "Total Seats",
            dataIndex: "totalSeats"
        },
        {
            title: "Availaible Seats",
            dataIndex: "available seats",
            render: (text, record) => { 
                return record.totalSeats - record.filledSeats.length;
            }
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

            {view === "form" && (<Form
                layout='vertical'
                onFinish={handleAddShow}
            >
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
                            <input type="date"
                                min={new Date().toISOString().split("T")[0]}
                            />
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
