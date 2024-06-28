import React, { useEffect, useState } from 'react';
import {  Col, Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { GetAllMovie } from '../../apicalls/movies';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function Home() {

  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovie();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <input type='text'
        className='search-input'
        placeholder='Search for movies'
        value={searchText}
        onChange={ (e) => setSearchText(e.target.value)}
      />

      <Row
        gutter={[20]}
        className='mt-1'
      >
        {movies
          .filter((movie)=> movie.title.toLowerCase().includes(searchText.toLowerCase()))
          .map((movie) => (
          <Col span={6}>
            <div className="card flex flex-col gap-1 cursor-pointer"
              onClick={() => navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)}
            >
              <img src={movie.poster} alt="" height={200} />
              <div className="flex justify-center gap-1">
                <h1 className="text-md uppercase">
                  {movie.title}
                </h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home
