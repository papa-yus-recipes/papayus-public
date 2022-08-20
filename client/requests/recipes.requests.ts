import { get } from "./helpers";

export const getRecipe = (id: string) => get(`recipes/${id}`);

export const scanRecipes = (query = window.location.search) => get(`recipes/scan${query}`);
