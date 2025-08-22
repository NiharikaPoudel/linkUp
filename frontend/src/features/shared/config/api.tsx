// frontend/src/shared/config/api.tsx

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  // If you use auth tokens, set headers here or in each request
});

// Login API call
export const login = (data: { username: string; password: string }) => {
  return axios.post("http://localhost:5000/api/auth/login", data);
};

// Register API call
export const registerApi = (data: { email: string; username: string; password: string }) => {
  return axiosInstance.post("/auth/register", data);
};

// Search users by username query
export const searchUsersApi = (query: string) => {
  return axiosInstance.get(`/user/search?u=${encodeURIComponent(query)}`);
};

// Get user profile by id
export const getUserById = (id: string) => {
  return axiosInstance.get(`/user/${id}`);
};

export default axiosInstance;
