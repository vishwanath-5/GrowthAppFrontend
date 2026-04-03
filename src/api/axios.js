import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_NODE_BASE_URL, // e.g. https://growthappbackend.onrender.com/api
});

// 🔐 REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("access"); // ✅ use "access" for JWT

    // ✅ Skip adding token for login endpoint
    if (token && !req.url.includes("/token/")) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// 🚨 RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (res) => res,
  (error) => {
    // ✅ Only logout if token exists and is invalid
    if (error.response?.status === 401) {
      console.log("🔴 Unauthorized - Token expired or invalid");

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;