import type { RecipeKey } from "./recipe.types";

import { Recipe } from "./Models";

export const getRecipe = async (key: RecipeKey) => (await Recipe.get(key)).populate();
