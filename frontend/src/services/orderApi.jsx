import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/orders`
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