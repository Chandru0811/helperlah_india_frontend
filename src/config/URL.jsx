import axios from "axios";

const api = axios.create({
  // baseURL: "https://sgitjobs.com/helperslah/api/",
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("helperlah_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
