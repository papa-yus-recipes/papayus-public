import type { IRecipe } from "./recipes.types";

import { get } from "./helpers";

export const getRecipe = (query = window.location.search) => get<IRecipe>(`recipes${query}`);
