import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5029/api";

const getAuthToken = () => localStorage.getItem("token");

const apiService = {
  registerUser: (userData: any) =>
    axios.post(`${API_URL}/users/register`, userData),
  login: (credentials: any) =>
    axios.post(`${API_URL}/users/login`, credentials),
  uploadPhotos: (userId: string, formData: FormData) =>
    axios.post(`${API_URL}/users/upload-photo/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
  updateUser: (userId: string, updatedData: any) =>
    axios.put(`${API_URL}/users/update/${userId}`, updatedData, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
  searchUsers: (query: any) =>
    axios.get(`${API_URL}/users/search`, {
      params: query,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
  getUserById: (userId: string) =>
    axios.get(`${API_URL}/users/user/${userId}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
  deletePhoto: (photoId: number) =>
    axios.delete(`${API_URL}/users/delete-photo/${photoId}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
};

export default apiService;
