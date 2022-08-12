import dynamoose from "dynamoose";

import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

import { Tag } from "./Tag";
import { id, rangeKey } from "./helpers";

interface IIngredient {
  main: string;
  substitutes: Array<string>;
}

interface IStep {
  step: string;
  elaboration: string;
}

interface IRecipe extends Document {
  id: string;
  name: string;
  description: string;
  image_id: string;
  time: number;
  servings: number;
  ingredients: Array<IIngredient>;
  steps: Array<IStep>;
}

export const Recipe = dynamoose.model<IRecipe>(
  "recipe",
  new dynamoose.Schema({
    id,
    name: rangeKey,
    description: { type: String, required: true },
    image_id: { type: String, required: true },
    tags: {
      type: Set,
      schema: [Tag],
      required: true
    },
    time: {
      type: Number,
      required: true,
      validate: Number.isInteger
    },
    servings: {
      type: Number,
      required: true,
      validate: Number.isInteger
    },
    ingredients: {
      type: Array,
      schema: [
        {
          main: String,
          substitutes: {
            type: Array,
            schema: [String]
          }
        }
      ],
      required: true
    },
    steps: {
      type: Array,
      schema: [
        {
          step: String,
          elaboration: String
        }
      ],
      required: true
    }
  }),
  { create: aws_config.dynamodb_config.create }
);
