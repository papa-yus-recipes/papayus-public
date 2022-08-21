import type { ReviewData, ReviewRecipeNUser } from "./reviews.types";
import type { UserData } from "./users.types";

import { getCookies } from "../helpers";

import { post } from "./helpers";

export const createUser = (data: UserData) => post(`users`, { body: new URLSearchParams(data) });

export const login = (data: UserData) => post(`users/login`, { body: new URLSearchParams(data) });

export const logout = () => {
  const { access_token, id, refresh_token } = getCookies("access_token", "id", "refresh_token");
  return post(`users/${id}/logout`, {
    body: new URLSearchParams({ refresh_token: refresh_token as string }),
    headers: { Authorization: `Bearer ${access_token}` }
  });
};

export const createReview = (
  body: Omit<ReviewData, "rating"> & { rating: string } & Pick<ReviewRecipeNUser, "recipe">
) => {
  const { access_token, id, refresh_token } = getCookies("access_token", "id", "refresh_token");
  return post(`users/${id}/reviews`, {
    body: new URLSearchParams({
      refresh_token: refresh_token as string,
      ...body
    }),
    headers: { Authorization: `Bearer ${access_token}` }
  });
};
