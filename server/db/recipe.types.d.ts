import type { IRecipe } from "./Models/Recipe.types";
import type { Condition } from "./types";

export type RecipeKey = Pick<IRecipe, "id" | "name">;

export type RecipesScanOptions = Partial<Pick<IRecipe, "tags">> & {
  condition?: Condition;
  query?: string;
};
