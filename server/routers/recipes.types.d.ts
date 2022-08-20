import type { Query } from "./types";
import type { RecipeKey } from "db/Models/Recipe.types";
import type { ScanRecipesOptions } from "db/recipe.types";

export type RecipesGetParams = { id: RecipeKey };

export type RecipesScanQuery = Query<ScanRecipesOptions>;
