import type { IRecipeReference } from "./Recipe.types";
import type { IUserReference } from "./User.types";
import type { Doc, HasId, HasTimestamps } from "./types";

export interface IReview extends HasId, HasTimestamps {
  recipe: IRecipeReference;
  user: IUserReference;
  rating: number;
  comment: string;
}
export type ReviewDoc = Doc<IReview>;
