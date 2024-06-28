import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { message } from 'antd';
import { GetShowById } from '../../apicalls/theaters';
import moment from 'moment';
import Button from '../../components/Button'
import StripeCheckout from 'react-stripe-checkout';

function BookShow() {
  const [show, setShow] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const onToken = (token) => { 
    console.log(token);
  };
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


  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);
    return <div className="flex gap-1 flex-col p-2 card">
      {/* loops from 0 to 119 */}
      {Array.from(Array(rows).keys()).map((seat, index) => {
        return (<div className="flex gap-1 justify-center">
          {
            // loops from 0 to 11 
            Array.from(Array(columns).keys()).map((column, index) => {
              const seatNumber = seat * columns + column + 1;
              let seatClass = "seat";
              if (selectedSeats.includes(seat * columns + column + 1)) {
                //console.log(`${seatClass}`);
                seatClass += " selected-seat";
                //console.log(`${seatClass}`);
              }
              if (show.filledSeats.includes(seat * columns + column + 1)) {
                seatClass += " booked-seat";
              }
              return seat * columns + column + 1 <= totalSeats && <div className={seatClass}
                onClick={() => {

                  if (selectedSeats.includes(seatNumber)) {
                    setSelectedSeats(selectedSeats.filter((item) => item !== seatNumber));
                  } else {
                    setSelectedSeats([...selectedSeats, seatNumber]);
                  }
                }}>
                <h1 className="text-sm">{seat * columns + column + 1}</h1>
              </div>
            })
          }
        </div>)
      })}
    </div>
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

        {/* seats */}
      </div>
      <div className="flex justify-center mt-2">{getSeats()}</div>
      {selectedSeats.length>0 && <div className="mt-2 flex justify-center">
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_51PWZ4I2N7AteUhiPrKAwcuAnJUURPc7K7yu0NzmoQaunRsvKCWEBESQcq4kRS0wBUk2JdB0kKiqh7BjEgBvSPugd00whVkzBSL"
          amount={ selectedSeats.length*100*show.ticketPrice}
        >
          <Button title = 'BOOK NOW'/>
        </StripeCheckout>
      </div>}
    </div>
  )
}

export default BookShow
