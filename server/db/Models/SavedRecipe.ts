import dynamoose from "dynamoose";

import type { SavedRecipeItem } from "./SavedRecipe.types";

import { Recipe } from "./Recipe";
import { User } from "./User";
import { required } from "./helpers";

export const SavedRecipe = dynamoose.model<SavedRecipeItem>(
  "saved_recipe",
  new dynamoose.Schema(
    {
      id: String,
      recipe: required(Recipe),
      user: required(User)
    },
    { timestamps: { createdAt: "savedAt" } }
  )
);
