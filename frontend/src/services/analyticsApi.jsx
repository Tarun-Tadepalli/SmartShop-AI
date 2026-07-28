import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/analytics`
});

export const getInventoryAnalysis = () => {
  return API.get(
    "/inventory"
  );

};
export const categoryChartUrl =
`${import.meta.env.VITE_API_BASE_URL}/api/analytics/category-chart`;