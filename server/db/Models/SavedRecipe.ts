import dynamoose from "dynamoose";

import type { ISavedRecipe } from "./SavedRecipe.types";
import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

import { Recipe } from "./Recipe";
import { User } from "./User";
import { required } from "./helpers";

export const SavedRecipe = dynamoose.model<ISavedRecipe & Document>(
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
