import dynamoose from "dynamoose";

import type { ReviewItem } from "./Review.types";

import { Recipe } from "./Recipe";
import { User } from "./User";
import { required } from "./helpers";

export const Review = dynamoose.model<ReviewItem>(
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
  )
);
