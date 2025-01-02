import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-interview.mcomp.web.id/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
