import { Request, Router } from "express";

import type { RecipesGetParams, RecipesScanQuery } from "./recipes.types";
import type { NeverRecord } from "./types";
import type { PopulatedRecipe } from "db/Models/Recipe.types";

import { getRecipe, scanRecipes } from "db/recipe.db";
import { validateRecipesGetParams, validateRecipesScanQuery } from "validation";

import { catchNext } from "./helpers";

export const recipes_router = Router();

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

recipes_router.get("/:id", (req: Request<RecipesGetParams, PopulatedRecipe>, res, next) =>
  catchNext(
    async () =>
      res.send(<PopulatedRecipe>(await getRecipe(validateRecipesGetParams(req.params))).toJSON()),
    next
  )
);
