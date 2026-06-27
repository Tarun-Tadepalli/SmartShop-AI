import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/profile"
});

export const changePassword = (data) =>
  API.put("/change-password", data);

export const updateProfileImage = (data) => {
  return API.put("/image", data);
};

export const uploadProfileImage = (formData) => {
  return axios.post(
    "http://127.0.0.1:8000/api/upload/profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

export const getProfile = (email) => {
  return API.get(`/${email}`);
};