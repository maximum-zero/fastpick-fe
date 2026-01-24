import axios from "axios";
import useAuthStore from "@/stores/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;
    const isAuthPage = currentPath === "/login" || currentPath === "/signup";

    if (status === 401) {
      if (!isAuthPage) {
        alert("인증 세션이 만료되었습니다. 다시 로그인해주세요.");
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    } else if (status === 403) {
      alert("해당 요청에 대한 권한이 없습니다.");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
