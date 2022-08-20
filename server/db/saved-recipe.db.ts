import { randomUUID } from "crypto";
import { transaction } from "dynamoose";

import type { SavedRecipeKey, SavedRecipeUserNRecipe } from "./Models/SavedRecipe.types";
import type Transaction from "dynamoose/dist/Transaction";

import { SavedRecipe } from "./Models";

const userNRecipeId = (user_n_recipe: SavedRecipeUserNRecipe) =>
  `${user_n_recipe.user}+${user_n_recipe.recipe.id}`;
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

export const saveRecipe = async (user_n_recipe: SavedRecipeUserNRecipe) => {
  const saved_recipe = { id: randomUUID(), ...user_n_recipe };
  await transaction([
    SavedRecipe.transaction.create(saved_recipe),
    createSavedRecipeUserNRecipeId({ user: saved_recipe.user, recipe: saved_recipe.recipe })
  ]);
  return new SavedRecipe(saved_recipe);
};

export const unsaveRecipe = async (key: SavedRecipeKey, user_n_recipe: SavedRecipeUserNRecipe) =>
  transaction([SavedRecipe.transaction.delete(key), deleteSavedRecipeUserNRecipeId(user_n_recipe)]);
