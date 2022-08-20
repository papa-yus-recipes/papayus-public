import dynamoose from "dynamoose";

import type { RecipeItem } from "./Recipe.types";

import { Tag } from "./Tag";

export const Recipe = dynamoose.model<RecipeItem>(
  "recipe",
  {
    id: String,
    name: {
      type: String,
      index: {
        type: "global"
      }
    },
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
  },
  { create: true }
);
