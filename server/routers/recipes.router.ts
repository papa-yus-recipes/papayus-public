import { Request, Router } from "express";

import type { RecipesGetQuery } from "./recipes.types";
import type { NeverRecord } from "./types";
import type { IRecipe } from "db/Models/Recipe.types";

import { getRecipe } from "db/recipe.db";
import { validateRecipesGetQuery } from "validation/recipes.validation";

import { catchNext } from "./helpers";

export const recipes_router = Router();

recipes_router.get(
  "/",
  (req: Request<NeverRecord, IRecipe, NeverRecord, RecipesGetQuery>, res, next) =>
    catchNext(async () => {
      res.send(<IRecipe>(await getRecipe(validateRecipesGetQuery(req.query))).toJSON());
    }, next)
);
