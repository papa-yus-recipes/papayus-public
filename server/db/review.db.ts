import { randomUUID } from "crypto";
import { transaction } from "dynamoose";

import type { RecipeKey } from "./Models/Recipe.types";
import type { ReviewData, ReviewKey, ReviewRecipeNUser } from "./Models/Review.types";
import type Transaction from "dynamoose/dist/Transaction";

import { Review } from "./Models";

const recipeNUserId = (recipe_n_user: ReviewRecipeNUser) =>
  `${recipe_n_user.recipe}+${recipe_n_user.user}`;
const createReviewRecipeNUserId = (recipe_n_user: ReviewRecipeNUser): Transaction => ({
  Put: {
    ConditionExpression: "attribute_not_exists(id)",
    Item: {
      id: { S: recipeNUserId(recipe_n_user) }
    },
    TableName: Review.name
  }
});
const deleteReviewRecipeNUserId = (recipe_n_user: ReviewRecipeNUser) =>
  Review.transaction.delete(recipeNUserId(recipe_n_user));

export const createReview = async (data: ReviewData & ReviewRecipeNUser) => {
  const review = { id: randomUUID(), ...data };
  await transaction([
    Review.transaction.create(review),
    createReviewRecipeNUserId({ recipe: review.recipe, user: review.user })
  ]);
  return new Review(review);
};

export const getReviewsByRecipe = async (recipe: RecipeKey) =>
  (await Review.scan({ recipe }).exec()).populate();

export const updateReview = async (key: ReviewKey, update: Partial<ReviewData>) =>
  Review.update(key, update);

export const deleteReview = async (key: ReviewKey, recipe_n_user: ReviewRecipeNUser) =>
  transaction([Review.transaction.delete(key), deleteReviewRecipeNUserId(recipe_n_user)]);
