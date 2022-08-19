import React from "react";

import type { RecipeLinkProps } from "./Link.types";

import { recipeUrl } from "../../helpers";

export default class RecipeLink extends React.Component<RecipeLinkProps> {
  override render() {
    return (
      <a className={this.props.className} href={recipeUrl(this.props["recipe-key"])}>
        {this.props.children}
      </a>
    );
  }
}
