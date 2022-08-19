import React from "react";

import type { RecipeCollectionProps } from "./index.types";

import RecipeCard from "./Card";

import "./index.css";

export default class RecipeCollection extends React.Component<RecipeCollectionProps> {
  override render() {
    return (
      <div className="card-deck collection d-flex flex-wrap justify-content-center mt-5">
        {this.props.recipes.map((recipe, i) => (
          <RecipeCard key={i} recipe={recipe} />
        ))}
      </div>
    );
  }
}
