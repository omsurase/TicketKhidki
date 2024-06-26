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

//delete a movie 
export const DeleteMovie = async (payload) => {
    try {
        //console.log("hi2");
        const response = await axiosInstance.post("/api/movies/delete-movie", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

//get movie by id

export const GetMovieById = async (id) => { 
    try {
        const response = await axiosInstance.post(`/api/movies/get-movie-by-id/${id}`);
        return response.data;
    } catch (err) { 
        return err.response;
    }
}