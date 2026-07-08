export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const AUTH_TOKEN_KEY = "taskflow_token";
export const AUTH_USER_KEY = "taskflow_user";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
    dashboard: "/dashboard",
    tasks: "/tasks",
  profile: "/profile",
};
   