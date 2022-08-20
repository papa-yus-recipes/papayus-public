import type { Tag, TagKey } from "./Tag.types";
import type { Item, HasId } from "./types";

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

type BaseRecipe = { id: RecipeKey } & {
  name: string;
  description: string;
  time: number;
  servings: number;
  ingredients: Array<Ingredient>;
  steps: Array<Step>;
};

export type Recipe = BaseRecipe & { tags: RecipeTags };

export type RecipeItem = Item<Recipe>;

export type PopulatedRecipe = BaseRecipe & {
  tags: Array<Tag>;
};
