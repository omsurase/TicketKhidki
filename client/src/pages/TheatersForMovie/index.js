import React, { useEffect, useState } from 'react';
import { Col, Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { GetAllMovie, GetMovieById } from '../../apicalls/movies';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { GetAllTheatersByMovie } from '../../apicalls/theaters';

function TheatersForMovie() {

    const tempDate = new URLSearchParams(window.location.search).get("date");
    const [date, setDate] = useState(
        tempDate || moment().format("YYYY-MM-DD")
    )
    const params = useParams();
    const [movie, setMovie] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const navigate = useNavigate(params.id);
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetMovieById(params.id);
            if (response.success) {
                setMovie(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    };
    const getTheaters = async () => { 
        try { 
            dispatch(ShowLoading());
            const response = await GetAllTheatersByMovie({ date, movie: params.id });
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
    }
    const dispatch = useDispatch();
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getTheaters();
    }, [date]);


    return (
        <div>
            {movie && <div>
                {/* Movie Info */}
                <div className='flex justify-between items-center mb-2'>
                    <div>
                        <h1 className='text-2xl uppercase'>
                            {movie.title} ({movie.language})
                        </h1>
                        <h1 className="text-md">
                            Duration: {movie.duration}
                        </h1>
                        <h1 className="text-md">
                            Release Date: {moment(movie.releaseDAte).format("MMM DD YYYY")}
                        </h1>
                        <h1 className="text-md">
                            Genre: {movie.genre}
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-md">Select Date</h1>
                        <input
                            type="date"
                            min={moment().format("YYYY-MM-DD")}
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                navigate(`/movie/${params.id}?date=${e.target.value}`);
                            }}
                        />
                    </div>
                </div>

                <hr />

                {/* Movie Theater */}
                <div className='mt-1'>
                    <h1 className='text-xl uppercase'>
                        Theaters
                    </h1>
                </div>
            </div>}
        </div>
    )
}

export default TheatersForMovie
