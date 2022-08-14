import type { IRecipe } from "./Models/Recipe.types";

import { Recipe } from "./Models";

export const getRecipe = (id: IRecipe["id"]) => Recipe.get(id);
