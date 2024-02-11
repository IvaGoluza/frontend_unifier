import axios, { InternalAxiosRequestConfig } from "axios";

import { loggedInUserType } from "./auth/IAuth";
import { BASE_URL } from "./backend_paths";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url && !config.url.endsWith("/login") && !config.url.endsWith("/registration")) {
      const currentUser = localStorage.getItem("user");
      if (currentUser) {
        const user: loggedInUserType = JSON.parse(currentUser);
        config.headers.Authorization = `Bearer ${user.auth.accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const currentUser = localStorage.getItem("user");
        if (currentUser) {
          const user: loggedInUserType = JSON.parse(currentUser);
          const response = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken: user.auth.refreshToken });
          const { accessToken } = response.data;
          user.auth.accessToken = accessToken;
          localStorage.setItem("user", JSON.stringify(user));

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
