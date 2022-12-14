import type { Tag, TagKey } from "./tags.types";
import type { HasId, Operator } from "./types";

export type RecipeKey = HasId["id"];

export type RecipeTags = Array<TagKey>;

type Ingredient = {
  main: string;
  substitutes?: Array<string>;
};

type Step = {
  step: string;
  elaboration?: string;
};

type Recipe = { id: RecipeKey } & {
  name: string;
  description: string;
  tags: Array<Tag>;
  time: number;
  servings: number;
  ingredients: Array<Ingredient>;
  steps: Array<Step>;
};

export type RecipesScanOptions = {
  operator?: Operator;
  query?: string;
  tags?: string;
};
