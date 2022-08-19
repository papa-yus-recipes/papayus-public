import dynamoose from "dynamoose";

import type { RecipeItem } from "./Recipe.types";

import { Tag } from "./Tag";
import { rangeKey } from "./helpers";

export const Recipe = dynamoose.model<RecipeItem>("recipe", {
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
});
