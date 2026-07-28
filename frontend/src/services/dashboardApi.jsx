import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/dashboard`
});

export const getDashboardStats = () => {
  return API.get("/stats");
};