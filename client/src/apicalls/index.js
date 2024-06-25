import axios from 'axios';

export const axiosInstance = axios.create({
    //baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});