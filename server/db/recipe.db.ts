import type { RecipeKey } from "./recipe.types";

import { Recipe } from "./Models";

export const getRecipe = (key: RecipeKey) => Recipe.get(key);
