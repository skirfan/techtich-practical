import axios from "axios";

const baseUrl = "http://localhost:5000";

const api = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
