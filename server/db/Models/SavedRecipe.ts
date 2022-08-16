import dynamoose from "dynamoose";

import type { SavedRecipeDoc } from "./SavedRecipe.types";

import { aws_config } from "configs";

import { Recipe } from "./Recipe";
import { User } from "./User";
import { required } from "./helpers";

export const SavedRecipe = dynamoose.model<SavedRecipeDoc>(
  "saved_recipe",
  new dynamoose.Schema(
    {
      id: String,
      recipe: required(Recipe),
      user: required(User)
    },
    { timestamps: { createdAt: "savedAt" } }
  ),
  { create: aws_config.dynamodb_config.create }
);
