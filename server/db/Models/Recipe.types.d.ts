import type { ITagReference } from "./Tag.types";
import type { Item, HasId } from "./types";

interface IIngredient {
  main: string;
  substitutes?: Array<string>;
}

interface IStep {
  step: string;
  elaboration?: string;
}

export interface IRecipe extends HasId {
  name: string;
  description: string;
  tags: Array<ITagReference>;
  time: number;
  servings: number;
  ingredients: Array<IIngredient>;
  steps: Array<IStep>;
}

export type RecipeItem = Item<IRecipe>;

export type IRecipeReference = Pick<IRecipe, "id" | "name">;
