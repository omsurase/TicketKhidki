import { axiosInstance } from "./index";

//make payment

export const MakePayment = async (token, amount) => {
    console.log({token , amount});

    try {
        
        const response = await axiosInstance.post("/api/bookings/make-payment", {
            token, amount
        });
        return response;
    } catch (err) {
        return err.response.data;
    }
};