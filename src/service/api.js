import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://server.kabraemporium.com/api";
export const IMAGE_PATH   = import.meta.env.VITE_IMAGE_PATH   || "https://server.kabraemporium.com";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;