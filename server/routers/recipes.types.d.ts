import type { Query } from "./types";
import type { RecipeKey } from "db/Models/Recipe.types";
import type { RecipesScanOptions } from "db/recipe.types";

export type RecipesGetQuery = Query<RecipeKey>;

export type RecipesScanQuery = Query<RecipesScanOptions>;
