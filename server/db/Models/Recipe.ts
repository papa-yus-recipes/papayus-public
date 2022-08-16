import dynamoose from "dynamoose";

import type { RecipeDoc } from "./Recipe.types";

import { aws_config } from "configs";

import { Tag } from "./Tag";
import { rangeKey } from "./helpers";

export const Recipe = dynamoose.model<RecipeDoc>(
  "recipe",
  new dynamoose.Schema({
    id: String,
    name: rangeKey,
    description: String,
    tags: {
      type: Array,
      schema: [Tag]
    },
    time: Number,
    servings: Number,
    ingredients: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            main: String,
            substitutes: {
              type: Array,
              schema: [String]
            }
          }
        }
      ]
    },
    steps: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            step: String,
            elaboration: String
          }
        }
      ]
    }
  }),
  { create: aws_config.dynamodb_config.create }
);
