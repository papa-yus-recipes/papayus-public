import dynamoose from "dynamoose";

import type { ReviewDoc } from "./Review.types";

import { aws_config } from "configs";

import { Recipe } from "./Recipe";
import { User } from "./User";
import { required } from "./helpers";

export const Review = dynamoose.model<ReviewDoc>(
  "review",
  new dynamoose.Schema(
    {
      id: String,
      recipe: required(Recipe),
      user: required(User),
      rating: required(Number),
      comment: required(String)
    },
    {
      timestamps: true
    }
  ),
  { create: aws_config.dynamodb_config.create }
);
