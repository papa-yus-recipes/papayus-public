import type { RecipeReference } from "./Recipe.types";
import type { IUserReference } from "./User.types";
import type { Item, HasId, HasTimestamps } from "./types";

export type ReviewKey = HasId["id"];

export type ReviewRecipeNUser = {
  recipe: RecipeReference;
  user: IUserReference;
};

export type ReviewData = {
  rating: number;
  comment: string;
};

export type BaseReview = { id: ReviewKey } & HasTimestamps & ReviewData & ReviewRecipeNUser;

export type ReviewItem = Item<BaseReview>;
