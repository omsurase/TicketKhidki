const { axiosInstance } = require(".");

//add a new movie

export const AddMovie = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/movies/add-movie", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//get all movies 
export const GetAllMovie = async () => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//update movie 
export const UpdateMovie = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/movies/update-movie", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};