import React from "react";
import { createRoot } from "react-dom/client";

import type { Recipe } from "../requests/recipes.types";

import Content from "../Components/Content";
import RecipeCollection from "../Components/RecipeCollection";
import { json } from "../requests/helpers";
import { scanRecipes } from "../requests/recipes.requests";

import "../common";

scanRecipes()
  .then(json<Recipe[]>)
  .then((recipes) => {
    createRoot(document.getElementById(Content.id) as HTMLElement).render(
      <React.StrictMode>
        <Content h1-children="All Recipes">
          <RecipeCollection recipes={recipes} />
        </Content>
      </React.StrictMode>
    );
  });
