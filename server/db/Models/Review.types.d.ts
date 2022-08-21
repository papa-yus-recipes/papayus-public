import type { Recipe, RecipeKey } from "./Recipe.types";
import type { User, UserKey } from "./User.types";
import type { Item, HasId, HasTimestamps } from "./types";

export type ReviewKey = HasId["id"];

export type ReviewRecipeNUser = {
  recipe: RecipeKey;
  user: UserKey;
};

export type ReviewData = {
  rating: number;
  comment: string;
};

export type BaseReview = { id: ReviewKey } & HasTimestamps & ReviewData & ReviewRecipeNUser;

export type ReviewItem = Item<BaseReview>;

export type PopulatedReview = BaseReview & { user: User; recipe: Recipe };
