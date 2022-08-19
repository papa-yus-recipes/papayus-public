import type { RecipeTags } from "./Models/Recipe.types";
import type { Operator } from "./types";

export type RecipesScanOptions = {
  operator?: Operator;
  query?: string;
  tags?: RecipeTags;
};
