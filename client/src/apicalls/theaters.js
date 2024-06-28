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

// get all theatres
export const GetAllTheaters = async () => {
    try {
        const response = await axiosInstance.get("/api/theaters/get-all-theater");
        return response.data;
    } catch (error) {
        return error.response;
    }
};

//get all theaters by owner
export const GetAllTheatersByOwner = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/get-all-theater-by-owner", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//update theater 
export const UpdateTheater = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/update-theater", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//delete a theater
export const DeleteTheater = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/delete-theater", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//add a show
export const AddShow = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/add-show", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
}

//get all shows by theater
export const GetAllShowsByTheater = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/get-all-shows-by-theater", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//delete a show
export const DeleteShow = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/delete-show", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//get all theaters for a movie
export const GetAllTheatersByMovie = async (payload) => { 
    try {
        const response = await axiosInstance.post("/api/theaters/get-all-theaters-by-movie", payload);
        return response.data;
    } catch (err) { 
        return err.response;
     }
}

//get show by id
export const GetShowById = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/theaters/get-shows-by-id", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};