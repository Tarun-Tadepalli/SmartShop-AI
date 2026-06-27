import axios from "axios";

const API = axios.create({

baseURL:
"http://127.0.0.1:8000/api/feedback"

});

export const saveFeedback = (data) => {
    return API.post("/",data);
};

export const getFeedbackByOrder = (orderId) => {
    return API.get(`/${orderId}`); 
};