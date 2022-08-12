import dynamoose from "dynamoose";

import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

import { id, rangeKey } from "./definitions";

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
      rating: { type: Number, required: true },
      comment: { type: String, required: true }
    },
    { timestamps: true }
  ),
  { create: aws_config.dynamodb_config.create }
);
