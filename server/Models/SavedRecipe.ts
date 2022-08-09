import { randomUUID } from "crypto";
import dynamoose from "dynamoose";

import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

interface ISavedRecipe extends Document {
  id: string;
  rating: number;
  comment: string;
}

export const SavedRecipe = dynamoose.model<ISavedRecipe>(
  "saved_recipe",
  new dynamoose.Schema(
    {
      id: {
        type: String,
        default: () => randomUUID()
      },
      recipe: {
        type: String,
        required: true
      },
      user: {
        type: String,
        rangeKey: true,
        required: true
      }
    },
    { timestamps: { createdAt: "savedAt" } }
  ),
  { create: aws_config.dynamodb_config.create }
);
