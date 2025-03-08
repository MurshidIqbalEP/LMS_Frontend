import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const Api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
   
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);



Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for unauthorized errors (401)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite retry loop
      console.log(error.response.status);
      try {
        // Refresh the access token
        console.log("hai api call for reffresh ");

        const res = await Api.get("/user/refresh-token");
        let newAccessToken = res.data.accessToken;
        console.log(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer${newAccessToken}`;

        console.log(originalRequest, 'hhkh');
        
        // Retry the original request with the new access token
        return Api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem('userInfo')
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    
    return Promise.reject(error);
  }
);

export default Api;