import { get } from "./helpers";

export const getRecipe = (query = window.location.search) => get(`recipes${query}`);

export const scanRecipes = (query = window.location.search) => get(`recipes/scan${query}`);
