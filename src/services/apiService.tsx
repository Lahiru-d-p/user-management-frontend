import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5029/api";

const getAuthToken = () => localStorage.getItem("token");

const handleRequest = async (request: any) => {
  try {
    const response = await request();
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return {
        status: false,
        statusText: error.response.data?.statusText || "An error occurred",
      };
    } else {
      return {
        status: false,
        statusText: "Network error. Please try again.",
      };
    }
  }
};

const apiService = {
  registerUser: async (userData: any) =>
    handleRequest(() => axios.post(`${API_URL}/users/register`, userData)),

  login: async (credentials: any) =>
    handleRequest(() => axios.post(`${API_URL}/users/login`, credentials)),

  uploadPhotos: async (userId: string, formData: any) =>
    handleRequest(() =>
      axios.post(`${API_URL}/users/upload-photo/${userId}`, formData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
    ),

  updateUser: async (userId: string, updatedData: any) =>
    handleRequest(() =>
      axios.put(`${API_URL}/users/update/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
    ),

  searchUsers: async (query: any) =>
    handleRequest(() =>
      axios.get(`${API_URL}/users/search`, {
        params: query,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
    ),

  getUserById: async (userId: any) =>
    handleRequest(() =>
      axios.get(`${API_URL}/users/user/${userId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
    ),

  deletePhoto: async (photoId: number) =>
    handleRequest(() =>
      axios.delete(`${API_URL}/users/delete-photo/${photoId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
    ),
};

export default apiService;
