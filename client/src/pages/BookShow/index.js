import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { message } from 'antd';
import { GetShowById } from '../../apicalls/theaters';
import moment from 'moment';
function BookShow() {
  const [show, setShow] = useState();
  const params = useParams();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => { getData() }, []);
  return (
    show && <div>
      {/* Show Information */}

      <div className="flex justify-between card p-2 items-center">
        <div>
          <h1 className="text-xl">
            {show.theater.name}
          </h1>
          <h1 className="text-sm">
            {show.theater.address}
          </h1>
        </div>
        <div>
          <h1 className="text-2xl uppercase">
            {show.movie.title} ({show.movie.language})
          </h1>
        </div>
        <div>
          <h1 className="text-xl">
            {moment(show.date).format("MMM DD YYYY")} - {" "}
            {moment(show.time, "HH:mm").format("hh:mm A")}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default BookShow
