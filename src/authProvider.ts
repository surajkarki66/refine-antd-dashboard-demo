import { AuthProvider } from "@pankod/refine-core";
import { notification } from "@pankod/refine-antd";

export const TOKEN_KEY = "refine-auth";

const mockUsers = [
  {
    email: "admin@admin.com",
    roles: ["admin"],
  },
  {
    email: "editor@editor.com",
    roles: ["editor"],
  },
];

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const user = mockUsers.find((item) => item.email === email);

    if (user) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
      return Promise.resolve();
    }

    return Promise.reject({
      name: "Login Failed!",
      message:
        "The username or password that you've entered doesn't match any account.",
    });
  },
  register: async ({ email, password }) => {
    try {
      await authProvider.login({ email, password });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject({
        name: "Register Failed!",
        message: "The email or password missing.",
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
    localStorage.removeItem(TOKEN_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    return localStorage.getItem(TOKEN_KEY)
      ? Promise.resolve()
      : Promise.reject({ redirectPath: "/custom-url" });
  },
  getPermissions: async () => {
    const auth = localStorage.getItem(TOKEN_KEY);
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject();
  },
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return Promise.reject();
    }

    return Promise.resolve({
      id: 1,
      name: "James Sullivan",
      avatar: "https://i.pravatar.cc/150",
    });
  },
};
