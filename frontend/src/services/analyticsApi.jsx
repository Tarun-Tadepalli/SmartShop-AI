import axios from "axios";

const API = axios.create({
  baseURL:
  "http://127.0.0.1:8000/api/analytics"
});

export const getInventoryAnalysis = () => {
  return API.get(
    "/inventory"
  );

};
export const categoryChartUrl = "http://127.0.0.1:8000/api/analytics/category-chart";