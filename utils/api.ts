import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


export const getProducts = async () => {
  try {
    const response = await axiosInstance.get('/case-study/products');
    return response.data;
  } catch (err: any) {
    return err;
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/case-study/products/${id}`);
    return response.data;
  } catch (err: any) {
    return err;
  }
}

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/case-study/categories');
    return response.data;
  } catch (err: any) {
    return err;
  }
}

export const createProduct = async (reqBody) => {
  try {
    const response = await axiosInstance.post('/case-study/products', reqBody);
    return response.data;
  } catch (err: any) {
    return err;
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/case-study/products/${id}`);
   return response.data    
  } catch (err: any) {
    return err;
  }
}