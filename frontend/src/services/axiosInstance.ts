import axios from "axios";
import { BACKEND_URL } from "../config";

// create  an instance of the axios

const axiosInstance = axios.create({
  baseURL: BACKEND_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    " Content-type": " application/json",
  },
});
export default axiosInstance;
