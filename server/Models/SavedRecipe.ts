import dynamoose from "dynamoose";

import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

import { id, rangeKey } from "./helpers";

interface ISavedRecipe extends Document {
  id: string;
  rating: number;
  comment: string;
}

export const SavedRecipe = dynamoose.model<ISavedRecipe>(
  "saved_recipe",
  new dynamoose.Schema(
    {
      id,
      recipe: {
        type: String,
        required: true
      },
      user: rangeKey
    },
    { timestamps: { createdAt: "savedAt" } }
  ),
  { create: aws_config.dynamodb_config.create }
);
