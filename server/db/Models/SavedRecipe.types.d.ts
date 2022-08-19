import type { Recipe, RecipeKey } from "./Recipe.types";
import type { User, UserKey } from "./User.types";
import type { Item, HasId, HasTimestamps } from "./types";

export type SavedRecipeKey = HasId["id"];

export type SavedRecipeUserNRecipe = {
  user: UserKey;
  recipe: RecipeKey;
};

type BaseSavedRecipe = { id: SavedRecipeKey } & HasTimestamps<"savedAt">;

export type SavedRecipe = BaseSavedRecipe & SavedRecipeUserNRecipe;

export type SavedRecipeItem = Item<SavedRecipe>;

export type PopulatedSavedRecipe = BaseSavedRecipe & {
  user: User;
  recipe: Recipe;
};
