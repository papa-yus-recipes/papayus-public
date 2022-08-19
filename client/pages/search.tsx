import React from "react";
import { createRoot } from "react-dom/client";

import "../common";

import Content from "../Components/Content";
import RecipeCollection from "../Components/RecipeCollection";
import { scanRecipes } from "../requests/recipes.requests";

import "./recipe.css";

const search = window.location.search;

scanRecipes(search).then((recipes) => {
  const url_search_params = new URLSearchParams(search);
  const query = url_search_params.get("query");

  createRoot(document.getElementById(Content.id) as HTMLElement).render(
    <React.StrictMode>
      <Content
        h1-children={
          <>
            Search Results
            {query && (
              <>
                {" "}
                for <b>"{query}"</b>
              </>
            )}
          </>
        }
      >
        <RecipeCollection recipes={recipes} />
      </Content>
    </React.StrictMode>
  );
});
