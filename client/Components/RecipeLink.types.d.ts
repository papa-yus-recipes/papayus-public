import type { RecipeKey } from "../requests/recipes.types";
import type { ChildrenProps, ClassNameProps } from "./types";

export type RecipeLinkProps = ClassNameProps &
  ChildrenProps & {
    "recipe-key": RecipeKey;
  };
