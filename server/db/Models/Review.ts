import dynamoose from "dynamoose";

import type { IReview } from "./Review.types";
import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

import { Recipe } from "./Recipe";
import { User } from "./User";
import { required } from "./helpers";

export const Review = dynamoose.model<IReview & Document>(
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
