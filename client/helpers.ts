import type { QueryParams, SearchOptions } from "./types";

import { RecipeKey } from "./requests/recipes.types";

export const getCookies = <T extends string[]>(...keys: T) => {
  const document_cookies = document.cookie.split(/;\s*/);
  const cookies: Partial<Record<T[number], string>> = {};
  for (const key of keys) {
    const prefix = `${key}=`;
    const cookie = document_cookies.find((cookie) => cookie.startsWith(prefix));
    if (!cookie) continue;
    cookies[key as T[number]] = cookie.substring(prefix.length);
  }
  return cookies;
};

export const isEven = (n: number) => (n & 1) === 0;

export const minutesToTime = (minutes: number) => {
  const remainder = minutes % 60;
  let time = `${remainder}mins`;
  const hours = (minutes - remainder) / 60;
  if (hours) time = `${hours}h ${time}`;
  return time;
};

export const recipeUrl = (key: RecipeKey) => `/recipe.html?${new URLSearchParams(key).toString()}`;

export const recipeImageUrl = (id: RecipeKey["id"]) =>
  `https://papayus-recipe-images.s3.ap-southeast-1.amazonaws.com/${id}.jpg`;

export const searchUrl = ({ query, tags }: SearchOptions) => {
  const params: QueryParams = {};
  if (query) params["query"] = query;
  if (tags) params["tags"] = tags.join(",");

  return `/search.html?${new URLSearchParams(params).toString()}`;
};
