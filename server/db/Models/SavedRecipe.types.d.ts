import type { IRecipeReference } from "./Recipe.types";
import type { IUserReference } from "./User.types";
import type { HasId } from "./types";

export interface ISavedRecipe extends HasId {
  recipe: IRecipeReference;
  user: IUserReference;
  savedAt: Date;
}
