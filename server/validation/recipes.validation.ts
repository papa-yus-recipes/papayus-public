import type { Validators } from "./type";
import type { RecipeKey } from "db/recipe.types";
import type { RecipesGetQuery } from "routers/recipes.types";

import { InvalidError } from "NextError";

type RecipesGetQueryKey = keyof RecipesGetQuery;

const validators: Validators<RecipesGetQueryKey> = {
  id: (v) => typeof v === "string" && v.length === 36,
  name: (v) => typeof v === "string"
};

export const validateRecipesGetQuery = ({ id, name }: RecipesGetQuery): RecipeKey => {
  const query = { id, name };
  for (const key in { id, name })
    if (!validators[<RecipesGetQueryKey>key](query[<RecipesGetQueryKey>key]))
      throw InvalidError(key);

  return <RecipeKey>query;
};
