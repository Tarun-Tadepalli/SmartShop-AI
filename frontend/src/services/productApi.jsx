import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/products"
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
      "http://127.0.0.1:8000/api/upload/product-image",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );
  };