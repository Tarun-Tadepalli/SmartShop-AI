import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`
});

export const registerUser = (data) => {
  return API.post("/register", data);
};

export const loginUser = (data) => {
  return API.post("/login", data);
};

export const forgotPassword = (data) => {
  return API.post("/forgot-password", data);
};

export const verifyOTP = (data) => {
  return API.post("/verify-otp", data);
};

export const changePassword = (data) => {
  return API.post("/change-password", data);
};