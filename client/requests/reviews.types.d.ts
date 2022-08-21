import type { RecipeKey } from "./recipes.types";
import type { HasId, HasTimestamps } from "./types";
import type { User, UserKey } from "./users.types";

export type ReviewKey = HasId["id"];

export type ReviewRecipeNUser = {
  recipe: RecipeKey;
  user: UserKey;
};

export type ReviewData = {
  rating: number;
  comment: string;
};

type Review = { id: ReviewKey } & HasTimestamps<"createdAt" | "updatedAt"> &
  ReviewData & { user: Omit<User, "password"> };
