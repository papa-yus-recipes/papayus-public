import type { Query } from "./types";
import type { RecipeKey, RecipesScanOptions } from "db/recipe.types";

export type RecipesGetQuery = Query<RecipeKey>;

export type RecipesScanQuery = Query<RecipesScanOptions>;
