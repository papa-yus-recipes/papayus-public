import dynamoose from "dynamoose";

import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

import { between, id, rangeKey } from "./helpers";

interface IReview extends Document {
  id: string;
  rating: number;
  comment: string;
}

export const Review = dynamoose.model<IReview>(
  "review",
  new dynamoose.Schema(
    {
      id,
      recipe: rangeKey,
      user: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true,
        validate: (rating) => Number.isInteger(rating) && between(<number>rating, 1, 5)
      },
      comment: {
        type: String,
        required: true,
        validate: (comment) => between((<string>comment).length, 1, 150)
      }
    },
    { timestamps: true }
  ),
  { create: aws_config.dynamodb_config.create }
);
