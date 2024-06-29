import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { message } from 'antd';
import { GetShowById } from '../../apicalls/theaters';
import moment from 'moment';
import Button from '../../components/Button'
import StripeCheckout from 'react-stripe-checkout';
import { BookShowTickets, GetPublicKey, MakePayment, MakePaymentIntent, ConfirmPaymentIntent } from '../../apicalls/bookings';

function BookShow() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.users);
  const [show, setShow] = useState();
  const [publicKey, setPublicKey] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);


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

  const onToken = async (token) => {
    dispatch(ShowLoading());
    try {
      // Create a payment intent
      const paymentIntentResponse = await MakePaymentIntent(token, selectedSeats.length * show.ticketPrice * 100);
      if (paymentIntentResponse.success) {
        const paymentIntent = paymentIntentResponse.data;

        // Book the selected seats
        const bookingResponse = await BookShowTickets({
          show: params.id,
          seats: selectedSeats,
          transactionId: paymentIntent.id,
          user: user._id
        });

        if (bookingResponse.success) {
          // Confirm the payment intent
          const confirmPaymentResponse = await ConfirmPaymentIntent(paymentIntent.id);
          if (confirmPaymentResponse.success) {
            // Booking and payment confirmation successful
            message.success('Booking and payment successful');
            navigate("/profile");
          } else {
            message.error(confirmPaymentResponse.message);
          }
        } else {
          message.error(bookingResponse.message);
        }
      } else {
        message.error(paymentIntentResponse.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(HideLoading());
    }
  };


  // const book = async (transactionId) => {
  //   try {
  //     // console.log({
  //     //   show: params.id,
  //     //   seats: selectedSeats,
  //     //   transactionId,
  //     //   user: user._id
  //     // });
  //     const response = await BookShowTickets({
  //       show: params.id,
  //       seats: selectedSeats,
  //       transactionId,
  //       user: user._id
  //     });
  //     console.log(response);
  //     if (response.success) {
  //       message.success(response.message);
  //     } else {
  //       message.error(response.message);
  //     }
  //   } catch (err) {
  //     message.error(err.message);
  //   }
  // }

  const getPublicKey = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetPublicKey();
      if (response.success) {
        //console.log(response.data);
        setPublicKey(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  }

  useEffect(() => {
    getData()
    getPublicKey()
  }, []);
  return (
    show && <div>
      {/* Show Information */}

      <div className="flex justify-between card p-2 items-center">
        <div>
          <h1 className="text-sm">
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
          <h1 className="text-sm">
            {moment(show.date).format("MMM DD YYYY")} - {" "}
            {moment(show.time, "HH:mm").format("hh:mm A")}
          </h1>
        </div>

        {/* seats */}
      </div>
      <div className="flex justify-center mt-2">{getSeats()}</div>

      {selectedSeats.length > 0 && (
        <div className="mt-2 flex justify-center gap-2 items-center flex-col">
          <div className="flex justify-center">
            <div className="flex uppercase card p-2 gap-3">
              <h1 className="text-sm"><b>Selected Seats</b> : {selectedSeats.join(" , ")}</h1>

              <h1 className="text-sm">
                <b>Total Price</b> : {selectedSeats.length * show.ticketPrice}
              </h1>
            </div>
          </div>
          <StripeCheckout
            token={onToken}
            amount={selectedSeats.length * show.ticketPrice * 100}
            billingAddress
            stripeKey={publicKey}
          >
            <Button title="Book Now" />
          </StripeCheckout>
        </div>
      )}

    </div>
  )
}

export default BookShow
