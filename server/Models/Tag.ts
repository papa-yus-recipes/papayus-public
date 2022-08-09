import dynamoose from "dynamoose";

import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

interface ITag extends Document {
  id: string;
  name: string;
  category: string;
}

export const Tag = dynamoose.model<ITag>(
  "tag",
  new dynamoose.Schema({
    name: String,
    category: String
  }),
  { create: aws_config.dynamodb_config.create }
);
