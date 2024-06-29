import { axiosInstance } from "./index";


//make payment
export const MakePayment = async (token, amount) => {
    //console.log({token , amount});
    try {

        const response = await axiosInstance.post("/api/bookings/create-payment-intent", {
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
    
    try {
        const response = await axiosInstance.post("/api/bookings/book-show", payload);
        console.log(response);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

// get bookings of a user
export const GetBookingsOfUser = async () => {
    try {
        const response = await axiosInstance.get("/api/bookings/get-bookings");
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}

//get public key
export const GetPublicKey = async () => {
    try {
        const response = await axiosInstance.get("/api/bookings/public-key");
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}

//create Payment Intent
export const MakePaymentIntent = async (token, amount) => {
    //console.log({token , amount});
    try {

        const response = await axiosInstance.post("/api/bookings/create-payment-intent", {
            token, amount
        });
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

//confirm Payment Intent
export const ConfirmPaymentIntent = async (paymentIntentId) => {
    try {
        const response = await axiosInstance.post("/api/bookings/confirm-payment-intent", {
            paymentIntentId: paymentIntentId
        });
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};