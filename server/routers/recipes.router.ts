import { Request, Router } from "express";

import type { RecipesGetQuery, RecipesScanQuery } from "./recipes.types";
import type { NeverRecord } from "./types";
import type { PopulatedRecipe } from "db/Models/Recipe.types";

import { getRecipe, scanRecipes } from "db/recipe.db";
import { validateRecipesGetQuery, validateRecipesScanQuery } from "validation";

import { catchNext } from "./helpers";

export const recipes_router = Router();

recipes_router.get(
  "/",
  (req: Request<NeverRecord, PopulatedRecipe, NeverRecord, RecipesGetQuery>, res, next) =>
    catchNext(
      async () =>
        res.send(<PopulatedRecipe>(await getRecipe(validateRecipesGetQuery(req.query))).toJSON()),
      next
    )
);

recipes_router.get(
  "/scan",
  (req: Request<NeverRecord, PopulatedRecipe[], NeverRecord, RecipesScanQuery>, res, next) =>
    catchNext(
      async () =>
        res.send(
          <PopulatedRecipe[]>(await scanRecipes(validateRecipesScanQuery(req.query))).toJSON()
        ),
      next
    )
);
