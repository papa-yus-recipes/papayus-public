import type { IRecipeReference } from "./Recipe.types";
import type { IUserReference } from "./User.types";
import type { Doc, HasId } from "./types";

export interface ISavedRecipe extends HasId {
  recipe: IRecipeReference;
  user: IUserReference;
  savedAt: Date;
}

export type SavedRecipeDoc = Doc<ISavedRecipe>;
