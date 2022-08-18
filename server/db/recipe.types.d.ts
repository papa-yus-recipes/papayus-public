import type { IRecipe } from "./Models/Recipe.types";

export type RecipeKey = Pick<IRecipe, "id" | "name">;
