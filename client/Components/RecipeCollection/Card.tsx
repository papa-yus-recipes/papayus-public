import React from "react";

import type { RecipeCardProps } from "./Card.types";

import { recipeImageUrl, rgbToString, wordToColor } from "../../helpers";

import RecipeLink from "./Link";

export default class RecipeCard extends React.Component<RecipeCardProps> {
  override componentDidMount() {
    const rgb = [0, 0, 0];
    for (const { name } of this.props.recipe.tags) {
      const color = wordToColor(name);
      for (let i = rgb.length; i--; ) {
        rgb[i] += color[i] as number;
      }
    }
    for (let i = rgb.length; i--; ) {
      rgb[i] /= this.props.recipe.tags.length;
    }
    (document.getElementById(this.props.recipe.id) as HTMLDivElement).style.borderColor =
      rgbToString(rgb);
  }

  override render() {
    return (
      <div className="card shadow-sm" id={this.props.recipe.id}>
        <RecipeLink recipe-key={this.props.recipe.id}>
          <img
            alt={this.props.recipe.name}
            className="card-img-top"
            src={recipeImageUrl(this.props.recipe.id)}
          />
        </RecipeLink>
        <div className="card-body d-flex flex-column">
          <RecipeLink
            className="bg-light card-title h5 overflow-hidden pb-2 pt-1 rounded-1 text-center text-decoration-none"
            recipe-key={this.props.recipe.id}
          >
            {this.props.recipe.name}
          </RecipeLink>
          <p className="card-text overflow-hidden">{this.props.recipe.description}</p>
        </div>
      </div>
    );
  }
}
