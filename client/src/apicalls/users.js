const { axiosInstance } = require(".");

export const RegisterUser = async (payload) => { 
    try { 
        const response = await axiosInstance.post("/api/users/register", payload);
        return response;
    } catch (err) { 
        return err.response
    }
}