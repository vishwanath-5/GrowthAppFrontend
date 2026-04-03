import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_NODE_BASE_URL,
});

// 🔐 REQUEST INTERCEPTOR
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (
    token &&
    !req.url.includes("/auth/login") &&
    !req.url.includes("/auth/register")
  ) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🚨 RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;