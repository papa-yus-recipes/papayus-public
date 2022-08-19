import type { Recipe } from "./recipes.types";

import { get } from "./helpers";

export const getRecipe = (query = window.location.search) => get<Recipe>(`recipes${query}`);

export const scanRecipes = (query = window.location.search) =>
  get<Recipe[]>(`recipes/scan${query}`);
