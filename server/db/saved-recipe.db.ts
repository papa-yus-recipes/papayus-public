import { randomUUID } from "crypto";
import { transaction } from "dynamoose";

import type { ISavedRecipe } from "./Models/SavedRecipe.types";
import type Transaction from "dynamoose/dist/Transaction";

import { SavedRecipe } from "./Models";

type SavedRecipeData = Omit<ISavedRecipe, "id" | "savedAt">;
type SavedRecipeUserNRecipe = Pick<ISavedRecipe, "user" | "recipe">;

const userNRecipeId = (user_n_recipe: SavedRecipeUserNRecipe) =>
  `${user_n_recipe.user.id}+${user_n_recipe.recipe.id}`;
const createSavedRecipeUserNRecipeId = (user_n_recipe: SavedRecipeUserNRecipe): Transaction => ({
  Put: {
    ConditionExpression: "attribute_not_exists(id)",
    Item: {
      id: { S: userNRecipeId(user_n_recipe) }
    },
    TableName: SavedRecipe.name
  }
});
const deleteSavedRecipeUserNRecipeId = (user_n_recipe: SavedRecipeUserNRecipe) =>
  SavedRecipe.transaction.delete(userNRecipeId(user_n_recipe));

export const saveRecipe = async (data: SavedRecipeData) => {
  const saved_recipe = { id: randomUUID(), ...data };
  await transaction([
    SavedRecipe.transaction.create(saved_recipe),
    createSavedRecipeUserNRecipeId({ user: saved_recipe.user, recipe: saved_recipe.recipe })
  ]);
  return new SavedRecipe(saved_recipe);
};

export const unsaveRecipe = async (id: ISavedRecipe["id"], user_n_recipe: SavedRecipeUserNRecipe) =>
  transaction([SavedRecipe.transaction.delete(id), deleteSavedRecipeUserNRecipeId(user_n_recipe)]);
