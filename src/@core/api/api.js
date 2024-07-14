import axios from "axios";
import { toast } from "react-hot-toast";
import { baseURL } from "./config";
const api = axios.create({
  baseURL
});

let showNotFoundError = true;
let loadingToast = null;

api.interceptors.request.use(function (config) {
  if (config.method !== "get") {
    loadingToast = toast.loading("Loading...", {
      style: { minWidth: "250px", fontWeight: "bold" }
    });
  }
  if (config.method === "get" && config.data) {
    showNotFoundError = config.data.showNotFoundError;
  }
  // const tokenStr = localStorage.getItem("gesToken") ? localStorage.getItem("gesToken") : null;
  // config.headers["Authorization"] = `Bearer ${tokenStr}`;
  return config;
});

api.interceptors.response.use(
  function (response) {
    if (loadingToast) {
      toast.dismiss(loadingToast);
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (loadingToast) {
      toast.dismiss(loadingToast);
    }
    if (showNotFoundError) {
      toast.error(error.response.data.error);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
