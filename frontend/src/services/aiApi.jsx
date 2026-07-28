import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/ai`
});

export const askAI = (question, history) => {

  return API.post("/chat", {

    question,

    history

  });

};