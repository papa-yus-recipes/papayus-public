import dynamoose from "dynamoose";

import type { ITag } from "./Tag.types";
import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

import { rangeKey } from "./helpers";

export const Tag = dynamoose.model<ITag & Document>(
  "tag",
  new dynamoose.Schema({
    name: String,
    category: rangeKey
  }),
  { create: aws_config.dynamodb_config.create }
);
