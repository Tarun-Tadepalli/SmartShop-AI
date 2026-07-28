import axios from "axios";

const API = axios.create({

baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/feedback`

});

export const saveFeedback = (data) => {
    return API.post("/",data);
};

export const getFeedbackByOrder = (orderId) => {
    return API.get(`/${orderId}`); 
};