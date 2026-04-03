import axios from "axios";

const API = axios.create({
  // ✅ MUST include /api
  baseURL: import.meta.env.VITE_NODE_BASE_URL,
});

// 🔐 REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("access token");

    // ✅ Skip token for auth endpoints
    if (
      token &&
      !req.url.includes("/token/") &&
      !req.url.includes("/users/register/")
    ) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// 🚨 RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Handle token expiration (TRY REFRESH FIRST)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_NODE_BASE_URL}/token/refresh/`,
            { refresh }
          );

          const newAccess = res.data.access;

          // ✅ Save new token
          localStorage.setItem("access", newAccess);

          // ✅ Retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return API(originalRequest);

        } catch (err) {
          console.log("🔴 Refresh token expired", err);

          localStorage.removeItem("access");
          localStorage.removeItem("refresh");

          window.location.href = "/login";
        }
      } else {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;