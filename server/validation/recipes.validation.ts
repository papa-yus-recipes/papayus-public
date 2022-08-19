import type { Validators } from "./type";
import type { RecipeKey } from "db/Models/Recipe.types";
import type { RecipesScanOptions } from "db/recipe.types";
import type { Operator } from "db/types";
import type { RecipesGetQuery, RecipesScanQuery } from "routers/recipes.types";
import type { QueryParam } from "routers/types";

import { InvalidError } from "NextError";

const validators: Validators<keyof RecipeKey | keyof RecipesScanOptions> = {
  id: (v: QueryParam) => typeof v === "string" && v.length === 36,
  name: Boolean,
  operator: (v: QueryParam) => (<Operator[]>["AND", "OR"]).includes(<Operator>v),
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
  operator,
  query: query_param,
  tags
}: RecipesScanQuery): RecipesScanOptions => {
  const query = {
    operator: operator ? operator : "AND",
    query: query_param,
    tags: tags?.split(",").filter(Boolean)
  };
  for (const key in query) {
    const value = query[<keyof RecipesScanQuery>key];
    if (typeof value !== "undefined" && !validators[<keyof RecipesScanQuery>key](<any>value))
      throw InvalidError(key);
  }

  return <RecipesScanOptions>query;
};
