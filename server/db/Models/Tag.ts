import dynamoose from "dynamoose";

import type { TagDoc } from "./Tag.types";

import { aws_config } from "configs";

import { rangeKey } from "./helpers";

export const Tag = dynamoose.model<TagDoc>(
  "tag",
  new dynamoose.Schema({
    name: String,
    category: rangeKey
  }),
  { create: aws_config.dynamodb_config.create }
);
