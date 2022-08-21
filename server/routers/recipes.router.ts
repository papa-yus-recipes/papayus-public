import { Request, Router } from "express";

import type { RecipesGetParams, RecipesGetResBody, RecipesScanQuery } from "./recipes.types";
import type { NeverRecord } from "./types";
import type { PopulatedRecipe } from "db/Models/Recipe.types";
import type { PopulatedReview } from "db/Models/Review.types";
import type { DeepPartial } from "dynamoose/dist/General";

import { getRecipe, scanRecipes } from "db/recipe.db";
import { getReviewsByRecipe } from "db/review.db";
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

recipes_router.get("/:id", (req: Request<RecipesGetParams, RecipesGetResBody>, res, next) =>
  catchNext(async () => {
    const key = validateRecipesGetParams(req.params);
    res.send(
      <RecipesGetResBody>await Promise.all([
        getRecipe(key).then((r) => r.toJSON()),
        getReviewsByRecipe(key).then((r) => {
          const review = <RecipesGetResBody & DeepPartial<PopulatedReview>>r.toJSON();
          delete review.recipe;
          delete review.user?.password;
          return <any>review;
        })
      ])
    );
  }, next)
);
