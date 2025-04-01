import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5029/api";

const getAuthToken = () => localStorage.getItem("token");

const apiService = {
  registerUser: async (userData: any) =>
    await axios.post(`${API_URL}/users/register`, userData),
  login: async (credentials: any) =>
    await axios.post(`${API_URL}/users/login`, credentials),
  uploadPhotos: async (userId: string, formData: FormData) =>
    await axios.post(`${API_URL}/users/upload-photo/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
  updateUser: async (userId: string, updatedData: any) =>
    await axios.put(`${API_URL}/users/update/${userId}`, updatedData, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
  searchUsers: async (query: any) =>
    await axios.get(`${API_URL}/users/search`, {
      params: query,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
  getUserById: async (userId: string) =>
    await axios.get(`${API_URL}/users/user/${userId}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
  deletePhoto: async (photoId: number) =>
    await axios.delete(`${API_URL}/users/delete-photo/${photoId}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
};

export default apiService;
