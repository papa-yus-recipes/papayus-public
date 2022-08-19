import type { RecipeKey } from "./Models/Recipe.types";
import type { ScanRecipesOptions } from "./recipe.types";
import type { ConditionInitializer } from "dynamoose/dist/Condition";

import { Recipe } from "./Models";
import { contains, joinConditions } from "./helpers";

export const getRecipe = async (key: RecipeKey) => (await Recipe.get(key)).populate();

export const scanRecipes = async ({ operator, query, tags }: ScanRecipesOptions) => {
  const scan_options: ConditionInitializer = {};

  const operator_n_tags_provided = operator && tags;

  if (query || operator_n_tags_provided) {
    const conditions = new Array<string>();

    scan_options["ExpressionAttributeNames"] = {};
    scan_options["ExpressionAttributeValues"] = {};

    if (query) {
      scan_options["ExpressionAttributeNames"]["#name"] = "name";
      scan_options["ExpressionAttributeNames"]["#description"] = "description";
      conditions.push(
        joinConditions([contains("#name", ":query"), contains("#description", ":query")], "OR")
      );
      scan_options["ExpressionAttributeValues"][":query"] = { S: query };
    }

    if (operator_n_tags_provided) {
      const tag_conditions = new Array<string>();

      scan_options["ExpressionAttributeNames"]["#tags"] = "tags";
      for (let i = tags.length; i--; ) {
        const tagI = `:tag${i}`;
        tag_conditions.push(contains("#tags", tagI));
        scan_options["ExpressionAttributeValues"][tagI] = { S: tags[i] as string };
      }
      conditions.push(joinConditions(tag_conditions, operator));
    }

    scan_options["FilterExpression"] = joinConditions(conditions, "AND");
  }

  return (await Recipe.scan(scan_options).exec()).populate();
};
