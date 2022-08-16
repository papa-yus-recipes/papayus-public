import type { IRecipe } from "./Models/Recipe.types";

import { Recipe } from "./Models";

type RecipeKey = Pick<IRecipe, "id" | "name">;

export const getRecipe = (key: RecipeKey) => Recipe.get(key);
