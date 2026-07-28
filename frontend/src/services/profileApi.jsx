import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/profile`
});

export const changePassword = (data) =>
  API.put("/change-password", data);

export const updateProfileImage = (data) => {
  return API.put("/image", data);
};

export const uploadProfileImage = (formData) => {
  return axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/upload/profile-image`,
    formData,
    {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
);
};

export const getProfile = (email) => {
  return API.get(`/${email}`);
};