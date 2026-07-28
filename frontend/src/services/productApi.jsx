import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/products`
});

export const addProduct = (data) => {
  return API.post("/", data);
};

export const getProducts = () => {
  return API.get("/");
};

export const getProductById = (id) => {
  
    return API.get(`/${id}`);
  };

  export const updateProduct =(id,data ) => {
    return API.put(`/${id}`,data);
  };
  
  export const deleteProduct =(id) => {
    return API.delete(`/${id}`);
  };

  export const uploadProductImage = (formData) => {
    return axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/upload/product-image`,
      formData,
      {
          headers: {
              "Content-Type": "multipart/form-data"
          }
      }
  );
  };