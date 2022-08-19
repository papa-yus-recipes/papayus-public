import { randomUUID } from "crypto";
import { transaction } from "dynamoose";

import type { IReview } from "./Models/Review.types";
import type Transaction from "dynamoose/dist/Transaction";

import { Review } from "./Models";

type ReviewData = Omit<IReview, "id" | "createdAt" | "updatedAt">;
type ReviewRecipeNUser = Pick<IReview, "recipe" | "user">;

const recipeNUserId = (recipe_n_user: ReviewRecipeNUser) =>
  `${recipe_n_user.recipe.id}+${recipe_n_user.user.id}`;
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

export const createReview = async (data: ReviewData) => {
  const review = { id: randomUUID(), ...data };
  await transaction([
    Review.transaction.create(review),
    createReviewRecipeNUserId({ recipe: review.recipe, user: review.user })
  ]);
  return new Review(review);
};

export const updateReview = async (
  id: IReview["id"],
  update: Partial<Omit<ReviewData, keyof ReviewRecipeNUser>>
) => Review.update(id, update);

export const deleteReview = async (id: IReview["id"], recipe_n_user: ReviewRecipeNUser) =>
  transaction([Review.transaction.delete(id), deleteReviewRecipeNUserId(recipe_n_user)]);
