import type { IRecipeReference } from "./Recipe.types";
import type { IUserReference } from "./User.types";
import type { Item, HasId } from "./types";

export interface ISavedRecipe extends HasId {
  recipe: IRecipeReference;
  user: IUserReference;
  savedAt: Date;
}

export type SavedRecipeItem = Item<ISavedRecipe>;
