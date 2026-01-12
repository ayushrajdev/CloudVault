import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // React
  timeout: 10000,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});

export default axiosInstance;

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("Unauthorized → logout user");
//     }
//     return Promise.reject(error);
//   }
// );
