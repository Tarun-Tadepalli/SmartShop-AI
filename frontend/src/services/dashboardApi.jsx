import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/dashboard"
});

export const getDashboardStats = () => {
  return API.get("/stats");
};