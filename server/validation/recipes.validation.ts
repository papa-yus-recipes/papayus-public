import type { Validators } from "./type";
import type { RecipeKey } from "db/Models/Recipe.types";
import type { ScanRecipesOptions } from "db/recipe.types";
import type { Operator } from "db/types";
import type { RecipesGetParams, RecipesScanQuery } from "routers/recipes.types";
import type { QueryParam } from "routers/types";

import { InvalidError } from "NextError";

import { isUuid } from "./helpers";

const validators: Validators<keyof RecipesGetParams | keyof RecipesScanQuery> = {
  id: isUuid,
  operator: (v: QueryParam) => (<Operator[]>["AND", "OR"]).includes(<Operator>v),
  query: Boolean,
  tags: (v: string[]) => Boolean(v.length)
};

export const validateRecipesGetParams = ({ id }: RecipesGetParams): RecipeKey => {
  if (!validators["id"](id)) throw InvalidError("id");

  return id;
};

export const validateRecipesScanQuery = ({
  operator,
  query: query_param,
  tags
}: RecipesScanQuery): ScanRecipesOptions => {
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

  return <ScanRecipesOptions>query;
};
