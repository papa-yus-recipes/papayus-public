import type { RecipeKey, RecipesScanOptions } from "./recipe.types";
import type { ConditionInitializer } from "dynamoose/dist/Condition";

import { Recipe } from "./Models";
import { contains } from "./helpers";

export const getRecipe = async (key: RecipeKey) => (await Recipe.get(key)).populate();

export const scanRecipes = async ({ condition, query, tags }: RecipesScanOptions) => {
  const scan_options: ConditionInitializer = {};

  if (query || tags) {
    if (!condition) condition = "AND";

    let filters = new Array<string>();

    scan_options["ExpressionAttributeNames"] = {};
    scan_options["ExpressionAttributeValues"] = {};

    if (tags) {
      scan_options["ExpressionAttributeNames"]["#tags"] = "tags";
      for (let i = tags.length; i--; ) {
        const tagI = `:tag${i}`;
        filters.push(contains("#tags", tagI));
        scan_options["ExpressionAttributeValues"][tagI] = { S: tags[i] as string };
      }
      filters = [filters.join(` ${condition} `)];
    }

    if (query) {
      scan_options["ExpressionAttributeNames"]["#name"] = "name";
      filters.push(contains("#name", ":name"));
      scan_options["ExpressionAttributeValues"][":name"] = { S: query };
    }

    scan_options["FilterExpression"] = filters.join(" AND ");
  }

  return (await Recipe.scan(scan_options).exec()).populate();
};
