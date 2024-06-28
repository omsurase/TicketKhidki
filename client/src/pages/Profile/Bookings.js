import React, { useState, useEffect } from 'react'
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { Table, message, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GetBookingsOfUser } from '../../apicalls/bookings';

function Bookings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);


    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetBookingsOfUser();
            if (response.success) {
                setBookings(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            message.error(err.message);
            dispatch(HideLoading());
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Row gutter={[16, 16]}>
                {bookings.map((booking) => (
                    <Col span={12}>
                        <div className="card p-2 uppercase flex justify-between">
                            <div>
                                <h1 className="text-xl">
                                    {booking.show.movie.title} ({booking.show.movie.language})
                                </h1>
                                <div className="divider"></div>
                                <h1 className="text-sm">
                                    {booking.show.theater.name} ({booking.show.theater.address})
                                </h1>
                            </div>
                        </div>

                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Bookings
