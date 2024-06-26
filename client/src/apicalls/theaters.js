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
export const GetAllTheatersByOwner = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/get-all-theater", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//update theater 
//update movie 
export const UpdateTheater = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/update-theater", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};