import { randomUUID } from "crypto";
import dynamoose from "dynamoose";

import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

interface IReview extends Document {
  id: string;
  rating: number;
  comment: string;
}

export const Review = dynamoose.model<IReview>(
  "review",
  new dynamoose.Schema(
    {
      id: {
        type: String,
        default: () => randomUUID()
      },
      recipe: {
        type: String,
        rangeKey: true,
        required: true
      },
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
