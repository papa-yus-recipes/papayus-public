import type { UserData } from "./users.types";

import { getCookies } from "../helpers";

import { post } from "./helpers";

export const createUser = (data: UserData) => post(`users`, { body: new URLSearchParams(data) });

export const login = (data: UserData) =>
  post(`users/login`, { body: new URLSearchParams(data), credentials: "include" });

export const logout = () => {
  const { access_token, id, refresh_token } = getCookies("access_token", "id", "refresh_token");
  return post(`users/${id}/logout`, {
    body: new URLSearchParams({ refresh_token: refresh_token as string }),
    credentials: "include",
    headers: { Authorization: `Bearer ${access_token}` }
  });
};
