import type { RecipeKey, RecipesScanOptions } from "db/recipe.types";
import type { Condition } from "db/types";
import type { RecipesGetQuery, RecipesScanQuery } from "routers/recipes.types";
import type { QueryParam } from "routers/types";

import { InvalidError } from "NextError";

const validators = {
  condition: (v: QueryParam) => (<Condition[]>["AND", "OR"]).includes(<Condition>v),
  id: (v: QueryParam) => typeof v === "string" && v.length === 36,
  name: Boolean,
  query: Boolean,
  tags: (v: string[]) => Boolean(v.length)
};

export const validateRecipesGetQuery = ({ id, name }: RecipesGetQuery): RecipeKey => {
  const query = { id, name };
  for (const key in query)
    if (!validators[<keyof RecipesGetQuery>key](query[<keyof RecipesGetQuery>key]))
      throw InvalidError(key);

  return <RecipeKey>query;
};

export const validateRecipesScanQuery = ({
  condition,
  query: query_param,
  tags
}: RecipesScanQuery): RecipesScanOptions => {
  const query = { condition, query: query_param, tags: tags?.split(",").filter(Boolean) };
  for (const key in query) {
    const value = query[<keyof RecipesScanQuery>key];
    if (typeof value !== "undefined" && !validators[<keyof RecipesScanQuery>key](<any>value))
      throw InvalidError(key);
  }

  return <RecipesScanOptions>query;
};
