import type { RecipeTags } from "./Models/Recipe.types";
import type { Operator } from "./types";

export type ScanRecipesOptions = {
  operator?: Operator;
  query?: string;
  tags?: RecipeTags;
};
