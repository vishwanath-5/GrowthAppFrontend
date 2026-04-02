import axios from "axios";

const API = axios.create({
  baseURL: "https://growthappmiddleware.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN BEING SENT:", token); // 👈 DEBUG

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
