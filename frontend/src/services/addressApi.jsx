import axios from "axios";

const API = axios.create({

baseURL:
"http://127.0.0.1:8000/api/addresses"

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