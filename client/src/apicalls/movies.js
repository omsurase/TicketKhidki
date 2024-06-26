const { axiosInstance } = require(".");

//add a new movie

export const AddMovie = async (payload) => { 
    try {
        const response = await axiosInstance.post("/api/movies/add-movie", payload);
        return response.data;
    } catch (err) { 
        return err.response;
    }
};