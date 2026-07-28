import axios from "axios";

const API = axios.create({

baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/addresses`

});

export const saveAddress = (data) => {
    return API.post("/",data);
};

export const getAddresses = (email) => {
    return API.get(`/${email}`);
};

export const getAddressByOrder =(orderId) => {
    return API.get(`/order/${orderId}`);
};