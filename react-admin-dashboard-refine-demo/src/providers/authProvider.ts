import axios, { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { AuthProvider } from "@pankod/refine-core";
import { notification } from "@pankod/refine-antd";

import { ILogin, IRegister } from "../interfaces/index";

const axiosInstance = axios.create({ baseURL: "http://127.0.0.1:8000/api" });
axiosInstance.interceptors.request.use(
  // Here we can perform any function we'd like on the request
  (request: AxiosRequestConfig) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("auth-token");
    // Check if the header property exists
    if (request.headers) {
      // Set the Authorization header if it exists
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      // Create the headers property if it does not exist
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return request;
  }
);

export { axiosInstance };
export const authProvider: AuthProvider = {
  login: async ({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      const data = await axiosInstance.post<ILogin>("/users/login/", {
        email,
        username,
        password,
      });
      if (data) {
        const { is_staff, is_superuser } = data.data;
        if (is_superuser && is_staff) {
          localStorage.setItem("auth-token", data.data.token);
          localStorage.setItem("role", "admin");
          return Promise.resolve();
        } else if (!is_superuser && is_staff) {
          localStorage.setItem("auth-token", data.data.token);
          localStorage.setItem("role", "editor");
          return Promise.resolve();
        } else {
          return Promise.reject({
            message: "Forbidden!",
            name: "You don't have a permission to access the dashboard.",
          });
        }
      }
    } catch (error: any) {
      return Promise.reject({
        name: "Login error occurred",
        message: "Login failed!",
      });
    }
  },
  register: async ({ email, username, password }) => {
    try {
      const data = await axiosInstance.post<IRegister>("/users/register/", {
        email,
        username,
        password,
      });
      if (data) {
        return Promise.resolve();
      }
    } catch (error: any) {
      return Promise.reject({
        message: "Register Failed!",
        name: "Register error occurred",
      });
    }
  },
  updatePassword: async () => {
    notification.success({
      message: "Updated Password",
      description: "Password updated successfully",
    });
    return Promise.resolve();
  },
  forgotPassword: async ({ email }) => {
    notification.success({
      message: "Reset Password",
      description: `Reset password link sent to "${email}"`,
    });
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("role");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    return localStorage.getItem("auth-token")
      ? Promise.resolve()
      : Promise.reject({ redirectPath: "/login" });
  },
  getPermissions: async () => {
    // fetching role of user from server
    // for now hardcoding the role
    return Promise.resolve(["admin", "editor"]);
  },
  getUserIdentity: async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      return Promise.reject();
    }
    const decoded: {
      username: string;
      email: string;
      exp: number;
      role: string;
    } = jwt_decode(token);
    return Promise.resolve({
      username: decoded.username,
      email: decoded.email,
      avatar: "https://i.pravatar.cc/150",
      role: localStorage.getItem("role"),
    });
  },
};
