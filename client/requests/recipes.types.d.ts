import type { ITagReference } from "./tags.types";
import type { HasId } from "./types";

export interface IRecipeKey extends HasId {
  name: string;
}

interface IRecipeIngredient {
  main: string;
  substitutes?: Array<string>;
}

interface IRecipeStep {
  step: string;
  elaboration?: string;
}

export interface IRecipe extends IRecipeKey {
  description: string;
  tags: Array<ITagReference>;
  time: number;
  servings: number;
  ingredients: Array<IRecipeIngredient>;
  steps: Array<IRecipeStep>;
}
