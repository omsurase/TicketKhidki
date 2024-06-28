import { axiosInstance } from "./index";

//make payment

export const MakePayment = async (token, amount) => {
    //console.log({token , amount});

    try {
        
        const response = await axiosInstance.post("/api/bookings/make-payment", {
            token, amount
        });
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

//book show

export const BookShowTickets = async (payload) => {
    //console.log({token , amount});
    console.log(payload);
    try {
        const response = await axiosInstance.post("/api/bookings/book-show", payload);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};