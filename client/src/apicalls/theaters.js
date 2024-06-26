import { axiosInstance } from "./index";

//add a new theater
export const AddTheater = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/add-theater", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//get all theaters
export const GetAllTheaters = async () => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.get("/api/theaters/get-all-theater");
        return response.data;
    } catch (err) {
        return err.response;
    }
};