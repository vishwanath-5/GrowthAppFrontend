import axios from "axios";

const API = axios.create({
  // ❗ NO /api here
  baseURL: import.meta.env.VITE_NODE_BASE_URL,
});

// 🔐 REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("access");

    // ✅ Skip token for login
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
    if (error.response?.status === 401) {
      console.log("🔴 Unauthorized - Token expired");

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;