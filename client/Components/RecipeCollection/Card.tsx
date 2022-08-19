import React from "react";

import type { RecipeKey } from "../../requests/recipes.types";
import type { RecipeCardProps } from "./Card.types";

import { recipeImageUrl, rgbToString, wordToColor } from "../../helpers";

import RecipeLink from "./Link";

export default class RecipeCard extends React.Component<RecipeCardProps> {
  #key: RecipeKey;

  constructor(props: RecipeCardProps) {
    super(props);

    this.#key = { id: props.recipe.id, name: props.recipe.name };
  }

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
    (document.getElementById(this.#key.id) as HTMLDivElement).style.borderColor = rgbToString(rgb);
  }

  override render() {
    return (
      <div className="card shadow-sm" id={this.#key.id}>
        <RecipeLink recipe-key={this.#key}>
          <img alt={this.#key.name} className="card-img-top" src={recipeImageUrl(this.#key.id)} />
        </RecipeLink>
        <div className="card-body d-flex flex-column">
          <RecipeLink
            className="bg-light card-title h5 overflow-hidden pb-2 pt-1 rounded-1 text-center text-decoration-none"
            recipe-key={this.#key}
          >
            {this.#key.name}
          </RecipeLink>
          <p className="card-text overflow-hidden">{this.props.recipe.description}</p>
        </div>
      </div>
    );
  }
}
