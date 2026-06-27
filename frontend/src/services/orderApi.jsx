import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/orders"
});

export const placeOrder = (data) => {
  return API.post("/", data);
};

export const getCustomerOrders = (email) => {
  return API.get(`/customer/${email}`);
};

export const getAllOrders = () => {
  return API.get("/");
};

export const updateOrderStatus = (
  id,
  status
) => {
  return API.put(
    `/${id}`,
    { status }
  );
};

export const requestReturn = (id, reason) => {
  return API.put(`/return/${id}`,
    {
      reason
    }
  );

};