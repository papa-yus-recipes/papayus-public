import type { TagReference } from "./tags.types";
import type { Id } from "./types";

export type RecipeKey = Id & {
  name: string;
};

type RecipeIngredient = {
  main: string;
  substitutes?: Array<string>;
};

type RecipeStep = {
  step: string;
  elaboration?: string;
};

export type Recipe = RecipeKey & {
  description: string;
  tags: Array<TagReference>;
  time: number;
  servings: number;
  ingredients: Array<RecipeIngredient>;
  steps: Array<RecipeStep>;
};
