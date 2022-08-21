import type { Query } from "./types";
import type { PopulatedRecipe, RecipeKey } from "db/Models/Recipe.types";
import type { BaseReview } from "db/Models/Review.types";
import type { User } from "db/Models/User.types";
import type { ScanRecipesOptions } from "db/recipe.types";

export type RecipesGetParams = { id: RecipeKey };

export type RecipesGetResBody = [
  PopulatedRecipe,
  (BaseReview & { user: Omit<User, "password"> })[]
];

export type RecipesScanQuery = Query<ScanRecipesOptions>;
